

$(document).ready(function() {
	var connected = false;
	qz.websocket.connect().then(function() {
	  console.log('Connected to qz!');
	  connected = true;
	});
	$('body').on('click','.store-card',function() {
		var index = $('.store-card').index(this);
		var parent = $('.store-card').get(index);
		var child = $(parent).children('.disponibleTurn');
		var elemUsersTurn = $(child).find('.accentUsersTurn')[0];
		var disponibleTurn = $(elemUsersTurn).text();
		console.log(disponibleTurn);
		connectAndPrint(disponibleTurn);
	});
	
	
});

function connectAndPrint(raw) {
    /*qz.websocket.connect().then(function() {
	  console.log('Connected!');
	  print();
	});*/
    
    // our promise chain
    connect().then(function() {
		console.log('Connected to qz!');
        return print(raw);
    }).then(function() {
        success();              // exceptions get thrown all the way up the stack
    }).catch(fail);             // so one catch is often enough for all promises
    
    // NOTE:  If a function returns a promise, you don't need to wrap it in a fuction call.
    //        The following is perfectly valid:
    //
    //        connect().then(print).then(success).catch(fail);
    //
    // Important, in this case success is NOT a promise, so it should stay wrapped in a function() to avoid confusion
}

function connect() {
    return new RSVP.Promise(function(resolve, reject) {
        if (qz.websocket.isActive()) {	// if already active, resolve immediately
            resolve();
        } else {
            // try to connect once before firing the mimetype launcher
            qz.websocket.connect().then(resolve, function reject() {
                // if a connect was not succesful, launch the mimetime, try 3 more times
                window.location.assign("qz:launch");
                qz.websocket.connect({ retries: 2, delay: 1 }).then(resolve, reject);
            });
        }
    });
}

// print logic
function print(raw) {
    var printer = "zebra";
    var options =  { size: { width: 8.5, height: 11}, units: "in", density: "600" };
    var config = qz.configs.create(printer, options); 
    var data = ['El seu torn\n', raw];

    // return the promise so we can chain more .then().then().catch(), etc.
    return qz.print(config, data);
}

// notify successful print
function success() { 
    console.log("Success");
}

function fail(e) {
    console.log("Error: " + e);
}
