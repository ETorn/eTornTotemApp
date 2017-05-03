module.exports = function(router, printer) {
    router.route('/print/:turn')
    .get(function (req, res) {
        if(req.params.turn != null) {
            printer.printTicketForTurn(req.params.turn, function () {
                res.json({'message': 'Ticket printed'});
            });
        }
        else {
            res.json({'message': 'Turn not send'});
        }
    });
}