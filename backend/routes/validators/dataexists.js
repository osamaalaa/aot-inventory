function checkdataexists(req, res, next) {
    let count = Object.keys(req.body).length;
    if (count <= 0) {
        res.status(401).json({ message: "Body is Empty, please send data as per catalog structure !" });
    } else {
        next();
    }
}

module.exports = checkdataexists;
