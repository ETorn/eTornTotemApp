var SerialPort = require('serialport'),
	serialPort = new SerialPort('/dev/ttyAMA0', {
		baudrate: 19200
	}),
	Printer = require('thermalprinter');

var path = __dirname + '/caprabobw.png';

serialPort.on('open',function() {
	var printer = new Printer(serialPort);
	printer.on('ready', function() {
		printer
			.center()
			.printImage('caprabobw.png')
			.printLine('Caprabo')
			.left()
			.printLine('El teu torn: 1')
			.lineFeed(3)
			.print(function() {
				console.log('done');
				process.exit();
			});
	});
});