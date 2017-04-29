var Jimp = require("jimp");
var qrcode = require('qrcode');

var streamBuffers = require('stream-buffers');

var IMG_WIDTH = 384;
var IMG_HEIGHT = 500;

var getTextImage = function(s, cb) {
  new Jimp(1000, 1000, 0xFFFFFFFF, function(err, text){
    if (err) throw err;

    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
      text.print(font, 0, 0, s);
      text.autocrop();

      cb(null, text);
    });
  });
};

var qrWritableStreamBuffer = new streamBuffers.WritableStreamBuffer();

qrcode.toFileStream(qrWritableStreamBuffer, 'http://www.caprabo.com/app', {errorCorrectionLevel: "H"});

new Jimp(IMG_WIDTH, IMG_HEIGHT, 0xFFFFFF50, function(err, img){
  if (err) throw err;

  new Jimp("caprabo.png", function(err, caprabo){
    if (err) throw err;

    caprabo.resize(300, Jimp.AUTO, Jimp.RESIZE_BICUBIC);
    caprabo.autocrop();
    //caprabo.write("out.png");

    var capraboX = img.bitmap.width / 2 - caprabo.bitmap.width / 2;
    var capraboY = 10;

    img.composite(caprabo, capraboX, capraboY);

    getTextImage("El teu torn es:", function(err, tornTextImage){
      var tornTextImageX = img.bitmap.width / 2 - tornTextImage.bitmap.width / 2;
      var tornTextImageY = 100;

      img.composite(tornTextImage, tornTextImageX, tornTextImageY);

      getTextImage("7", function(err, tornNumImage){
        tornNumImage.resize(50, Jimp.AUTO, Jimp.RESIZE_BICUBIC);

        var tornNumImageX = img.bitmap.width / 2 - tornNumImage.bitmap.width / 2;
        var tornNumImageY = 150;

        img.composite(tornNumImage, tornNumImageX, tornNumImageY);

        getTextImage("Descarrega la nostra app:", function(err, text){
          text.resize(200, Jimp.AUTO);

          var textX = img.bitmap.width / 2 - text.bitmap.width / 2;
          var textY = 270;

          img.composite(text, textX, textY);

          new Jimp(qrWritableStreamBuffer.getContents(), function(err, qr){
            if (err) throw err;

            //qr.write("qr.png");

            var qrX = img.bitmap.width / 2 - qr.bitmap.width / 2;
            var qrY = 300;

            img.composite(qr, qrX, qrY);

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

            img.rotate(180).write("test.png");
          });
        });
      });
    });
  });
});
