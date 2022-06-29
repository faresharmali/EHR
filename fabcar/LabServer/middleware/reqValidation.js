const handleError = (err, res, next, msg) => {
    res
        .status(500)
        .contentType("text/plain")
        .send({ message: msg });
    //.end("Oops! Something went wrong!");
};


exports.labUpdate = (req, res, next) => {
    if (!req.body.image || !req.body.report) {
        return handleError(req, res, next, `you can't seand empty request at least one field is expected...! ${req.body.image ? '' : 'files field is messing'},${req.body.report ? '' : 'report field is messing'}`);
    }
    next();


};




