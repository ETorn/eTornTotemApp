var p = require("./printer");

p.printTicketForTurn(1, function(err) {
  console.log("a");
  p.printTicketForTurn(1, function(err) {
    console.log("a");
    p.printTicketForTurn(1, function(err) {
      console.log("a");
    });
  });
});
