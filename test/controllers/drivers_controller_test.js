const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
    it('Post to /api/drivers creates a new driver', (done) => {
        Driver.count().then(count => {
            request(app)
                .post('/api/drivers')
                .send({email: 'test@test.com'})
                .end(() => {
                    Driver.count().then(newCount => {
                        assert(newCount === count + 1);
                        done();
                    });
                });
        });
    });
    it('Put to /api/drivers/id edits existing driver', (done) => {
        const driver = new Driver({email: 't@t.com', driving: false});
        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({driving: true})
                .end(() => {
                    Driver.findById(driver._id)
                        .then((driver) => {
                            assert(driver.driving === true);
                            done();
                        })
                });
        });
    });
    it('Delete to /api/drivers/id removes existing driver', (done) => {
        const driver = new Driver({email: 't2@t.com', driving: false});
        driver.save().then(() => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findById(driver._id)
                        .then((driver) => {
                            assert(!driver);
                            done();
                        })
                });
        });
    });
});