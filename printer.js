var l = require("debug")("printing");
l("Node started");

var Jimp = require("jimp");
var qrcode = require("qrcode");
var SerialPort = require("serialport");
var streamBuffers = require("stream-buffers");
var once = require("async-once");
var async_ = require("async");

var IMG_WIDTH = 384;
var IMG_HEIGHT = 500;

var loadFont = once(function(cb) {
  console.time("loadFont");
  Jimp.loadFont(Jimp.FONT_SANS_32_BLACK, function(err, font) {
    console.timeEnd("loadFont");
    return cb(null, font);
  });
});

var genTextCanvas = once(function(cb) {
  console.time("genTextCanvas");
  new Jimp(500, 100, 0xFFFFFFFF, function(err, text){
    console.timeEnd("genTextCanvas");
    return cb(err, text);
  });
});

var getTextImage = function(s, cb) {
  genTextCanvas(function(err, text){
    if (err) return cb(err);

    console.time("clone");
    text = text.clone();
    console.timeEnd("clone");

    loadFont(function (err, font) {
      if (err) return cb(err);

      text.print(font, 0, 0, s);
      text.autocrop();

      return cb(null, text);
    });
  });
};

var generateBaseImage = function generateBaseImage(cb) {
  l("Generating image");
  new Jimp(IMG_WIDTH, IMG_HEIGHT, 0xFFFFFF50, function(err, img){
    return cb(err, img);
  });
};

var addLogo = function addLogo(img, cb) {
  l("Loading base caprabo img");
  new Jimp("caprabo.png", function(err, caprabo){
    if (err) return cb(err);

    caprabo.resize(300, Jimp.AUTO, Jimp.RESIZE_BICUBIC);
    caprabo.autocrop();

    var capraboX = img.bitmap.width / 2 - caprabo.bitmap.width / 2;
    var capraboY = 10;

    l("Adding it");
    img.composite(caprabo, capraboX, capraboY);

    return cb(null, img);
  });
};

var addTextTornTitle = function addTextTornTitle(img, cb) {
  l("Generating text");
  getTextImage("El seu torn és:", function(err, tornTextImage){
    if (err) return cb(err);

    var tornTextImageX = img.bitmap.width / 2 - tornTextImage.bitmap.width / 2;
    var tornTextImageY = 100;

    l("Writing it");
    img.composite(tornTextImage, tornTextImageX, tornTextImageY);

    return cb(null, img);
  });
};

var addTextTornNumber = function addTextTornNumber(turn, img, cb) {
  l("Generating text");
  getTextImage(turn, function(err, tornNumImage){
    if (err) return cb(err);

    tornNumImage.resize(50, Jimp.AUTO, Jimp.RESIZE_BICUBIC);

    var tornNumImageX = img.bitmap.width / 2 - tornNumImage.bitmap.width / 2;
    var tornNumImageY = 150;

    l("Writing it");
    img.composite(tornNumImage, tornNumImageX, tornNumImageY);

    return cb(null, img);
  });
};

var addTextDownload = function addTextDownload(img, cb) {
  l("Generating text");
  getTextImage("Descarrega la nostra app:", function(err, text){
    if (err) return cb(err);

    text.resize(200, Jimp.AUTO);

    var textX = img.bitmap.width / 2 - text.bitmap.width / 2;
    var textY = 270;

    l("Writing it");
    img.composite(text, textX, textY);

    return cb(null, img);
  });
};

var addQrCode = function addQrCode(img, cb) {
  var qrWritableStreamBuffer = new streamBuffers.WritableStreamBuffer();

  l("Generating qr code");
  qrcode.toFileStream(qrWritableStreamBuffer, "http://www.caprabo.com/app", {errorCorrectionLevel: "H"});

  qrWritableStreamBuffer.on("finish", function(){
    new Jimp(qrWritableStreamBuffer.getContents(), function(err, qr){
      if (err) return cb(err);

      var qrX = img.bitmap.width / 2 - qr.bitmap.width / 2;
      var qrY = 300;

      l("Writing qr code");
      img.composite(qr, qrX, qrY);

      return cb(null, img);
    });
  });
};

var covertToMonochrome = function covertToMonochrome(img, cb) {
  l("Finishing image");
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
    // x, y is the position of this pixel on the image
    // idx is the position start position of this rgba tuple in the bitmap Buffer
    // this is the image

    var red   = this.bitmap.data[ idx + 0 ];
    var green = this.bitmap.data[ idx + 1 ];
    var blue  = this.bitmap.data[ idx + 2 ];
    var alpha = this.bitmap.data[ idx + 3 ];

    this.bitmap.data[idx+3] = 255;

    if ((red + green + blue) < (255 + 255 + 255 - 100)) {
      this.bitmap.data[idx] = 0;
      this.bitmap.data[idx+1] = 0;
      this.bitmap.data[idx+2] = 0;
    } else {
      this.bitmap.data[idx] = 255;
      this.bitmap.data[idx+1] = 255;
      this.bitmap.data[idx+2] = 255;
    }

  });

  /*img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {

    if (((x % 2) && !(y % 2)) || (!(x % 2) && (y % 2))) {
      this.bitmap.data[idx] = 255;
      this.bitmap.data[idx+1] = 255;
      this.bitmap.data[idx+2] = 255;
    }

  });*/

  return cb(null, img);
};

var rotateImg = function rotateImg(img, cb) {
  l("Rotating it");
  img.rotate(180);

  return cb(null, img);
};

var getImgBuffer = function getImgBuffer(img, cb) {
  l("Getting image buffer");
  console.time("buffer");
  img.getBuffer(Jimp.MIME_PNG, function(err, imgBuffer){
    if (err) return cb(err);

    console.timeEnd("buffer");

    return cb(null, imgBuffer);
  });
};

var printImg = function printImg(imgBuffer, cb) {
  l("printing");
  console.time("print");

  var serialPort = new SerialPort("/dev/ttyAMA0", {
    baudrate: 19200
  });
  var Printer = require("thermalprinter");

  serialPort.on("open",function() {
    var printer = new Printer(serialPort/*, {maxPrintingDots: 10, heatingTime: 60, heatingInterval: 1}*/);
    printer.on("ready", function() {
      printer
        .center()
        .printImage(imgBuffer)
        .lineFeed(3)
        .print(function() {
          l("done printing");

          console.timeEnd("print");

          cb(null);
        });
    });
  });
};

var getBaseImage = once(function getBaseImage(cb) {
  console.time("img");
  async_.waterfall(
    [
      generateBaseImage,
      addLogo,
      addTextTornTitle,
      addTextDownload,
      addQrCode,
      covertToMonochrome,
      rotateImg,
    ],

    function(err, img) {
      console.timeEnd("img");
      return cb(err, img)
    }
  );
});

module.exports = printTicketForTurn = function printTicketForTurn(turn, cb) {
  console.time("total");
  async_.waterfall(
    [
      getBaseImage,
      function addTurn(img, cbb) {
        addTextTornNumber(turn, img, function(err, img){
          cbb(err, img);
        });
      },
      getImgBuffer,
      function(img, cb){cb(null);}//printImg
    ],

    function(err, result) {
      console.timeEnd("total");
      return cb();
    }
  );
};
