var p = require("./printer");

p.printTicketForTurn(100, function(err) {
  console.log("Done");
p.printTicketForTurn(new Date(), function(err) {
  console.log("Done");
});
});