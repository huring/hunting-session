"use strict"

const ObjectId = require('mongodb').ObjectID;

class User {

    constructor() {
        this.oid = "5a58bd28734d1d61613fca76";
        this.uid = 1;
    }

    getByID(id) {

        var _this = this;
        console.log("Promise single result with ID");

        return new Promise(function(resolve, reject) {
            db.collection('users').findOne({_id: ObjectId(_this.oid)}, function(err, result) {
                if (err) {
                    reject(err);
                    done();
                } else {
                    resolve(result);
                }
            })
        });
    }

    getWeaponCollection() {
        var _this = this;

        if (this.uid === null)
            throw new Error("User ID is missing for weapon selection");

        console.log("Get all weapons for user");

        return new Promise((resolve, reject) => {
            db.collection('weapons').find({uid: _this.uid}).toArray((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }
}

exports.User = User;