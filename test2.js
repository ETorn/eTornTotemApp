console.log('Node started');

var Jimp = require("jimp");
var qrcode = require('qrcode');
var SerialPort = require('serialport');
var streamBuffers = require('stream-buffers');
var once = require('async-once');

var IMG_WIDTH = 384;
var IMG_HEIGHT = 500;

var loadFont = once(function(cb) {
  console.time('font');
  Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
    .then(function (font) {
      console.timeEnd('font');
      cb(null, font);
    });
});

var genTextCanvas = once(function(cb) {
  console.time('gen');
  new Jimp(500, 100, 0xFFFFFFFF, function(err, text){
    console.timeEnd('gen');
    cb(err, text);
  });
});  

var getTextImage = function(s, cb) {
  genTextCanvas(function(err, text){
    if (err) throw err;

    console.time('clone');
    text = text.clone();
    console.timeEnd('clone');

    loadFont(function (err, font) {
      text.print(font, 0, 0, s);
      text.autocrop();

      cb(null, text);
    });
  });
};

var qrWritableStreamBuffer = new streamBuffers.WritableStreamBuffer();

console.log('Generating qr code');
qrcode.toFileStream(qrWritableStreamBuffer, 'http://www.caprabo.com/app', {errorCorrectionLevel: "H"});

console.log('Generating image');
console.time('total');
console.time('img');
new Jimp(IMG_WIDTH, IMG_HEIGHT, 0xFFFFFF50, function(err, img){
  if (err) throw err;

  console.log('Loading base caprabo img');
  new Jimp("caprabo.png", function(err, caprabo){
    if (err) throw err;

    caprabo.resize(300, Jimp.AUTO, Jimp.RESIZE_BICUBIC);
    caprabo.autocrop();
    //caprabo.write("out.png");

    var capraboX = img.bitmap.width / 2 - caprabo.bitmap.width / 2;
    var capraboY = 10;

    console.log('Writing it');
    img.composite(caprabo, capraboX, capraboY);
    //console.time('write');
    //img.write('1.png');
    //console.timeEnd('write');

    console.log('Generating text');
    getTextImage("El seu torn és:", function(err, tornTextImage){
      var tornTextImageX = img.bitmap.width / 2 - tornTextImage.bitmap.width / 2;
      var tornTextImageY = 100;

      console.log('Writing it');
      img.composite(tornTextImage, tornTextImageX, tornTextImageY);
      //console.time('write');
      //img.write('2.png');
      //console.timeEnd('write');

      console.log('Generating text');
      getTextImage("7", function(err, tornNumImage){
        tornNumImage.resize(50, Jimp.AUTO, Jimp.RESIZE_BICUBIC);

        var tornNumImageX = img.bitmap.width / 2 - tornNumImage.bitmap.width / 2;
        var tornNumImageY = 150;

        console.log('Writing it');
        img.composite(tornNumImage, tornNumImageX, tornNumImageY);
        //console.time('write');
        //img.write('3.png');
        //console.timeEnd('write');

        console.log('Generating text');
        getTextImage("Descarrega la nostra app:", function(err, text){
          text.resize(200, Jimp.AUTO);

          var textX = img.bitmap.width / 2 - text.bitmap.width / 2;
          var textY = 270;

          console.log('Writing it');
          img.composite(text, textX, textY);
          //console.time('write');
          //img.write('4.png');
          //console.timeEnd('write');

          new Jimp(qrWritableStreamBuffer.getContents(), function(err, qr){
            if (err) throw err;

            //qr.write("qr.png");

            var qrX = img.bitmap.width / 2 - qr.bitmap.width / 2;
            var qrY = 300;

            console.log('Writing qr code');
            img.composite(qr, qrX, qrY);
            //console.time('write');
            //img.write('5.png');
            //console.timeEnd('write');

            console.log('Finishing image');
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

            //console.time('write');
            //img.write('6.png');
            //console.timeEnd('write');

            console.log('Rotating it');
            img.rotate(180);

            console.log('Writing it to disk');
            console.time('write');
            img.write('test.png');
            console.timeEnd('write');

            console.timeEnd('img');

            console.log('printing');

            console.time('print');

            var serialPort = new SerialPort('/dev/ttyAMA0', {
	      baudrate: 19200
	    });
            var Printer = require('thermalprinter');

            //process.exit();

            serialPort.on('open',function() {
	      var printer = new Printer(serialPort/*, {maxPrintingDots: 10, heatingTime: 60, heatingInterval: 1}*/);
	      printer.on('ready', function() {
                //process.exit();
		printer
                  .center()
		  .printImage('test.png')
		  .lineFeed(3)
		  .print(function() {
		    console.log('done printing');

                    console.timeEnd('print');
                    console.timeEnd('total');
                    process.exit();
		  });
	      });
            });
          });
        });
      });
    });
  });
});
