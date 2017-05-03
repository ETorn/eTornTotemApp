var printer = require('../../printer.js')

module.exports = function(router) {
    router.route('/print')
    .post(function (req, res) {
        if(req.body.turn != null) {
            printer.printTicketForTurn(req.body.turn, function (err, result) {
                res.json({'message': 'Ticket printed'});
            });
        }
        res.json({'message': 'Turn not send'});
    });
}