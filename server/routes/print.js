var printer = require('../../printer.js')

module.exports = function(router) {
    router.route('/print/:turn')
    .get(function (req, res) {
        if(req.params.turn != null) {
            printer.printTicketForTurn(req.params.turn, function (err, result) {
                res.json({'message': 'Ticket printed'});
            });
        }
        res.json({'message': 'Turn not send'});
    });
}