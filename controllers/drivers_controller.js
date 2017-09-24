const Driver = require('../models/Driver');

module.exports = {
    index(req, res, next) {
        const { lng, lat } = req.query;
        Driver.geoNear(
            { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            { spherical: true, maxDistance: 200000})
            .then((drivers) => {
                res.send(drivers);
            })
            .catch(next);
    },
    greeting(req, res, next) {
        res.send({hi: 'there'});
    },
    create(req, res, next) {
        const driverProps = req.body;
        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next)
    },
    update(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate(driverId, driverProps)
            .then(() => Driver.findById(driverId))
            .then(driver => res.send(driver))
            .catch(next);
    },
    delete(req, res, next) {
       const driverId = req.params.id;

       Driver.findByIdAndRemove(driverId)
           .then((driver) => {
                res.status(204).send(driver);
           })
           .catch(next);
    }
};