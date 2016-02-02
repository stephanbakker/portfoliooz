
module.exports = (err, req, res, next) => {
    res.sendStatus(500);
    res.render('error', {error: err});
}
