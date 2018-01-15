"use strict"

const ObjectId = require('mongodb').ObjectID;

class Sessions {
    constructor() {
        this.name = "foo";
        this.collection = 'hunting_sessions';
    }

    getAllSessions(coll) {

        console.log("Promise all results");

        return new Promise(function(resolve, reject) {
            db.collection('hunting_sessions').find().toArray(function(err, result) {
                if (err) {
                    reject("This is an error");
                } else {
                    resolve(result);
                }
            })
        });
    }

    getSingleSession(id) {

        console.log("Promise single result with ID");

        return new Promise(function(resolve, reject) {
            db.collection('hunting_sessions').findOne({_id: ObjectId(id)}, function(err, result) {
                if (err) {
                    reject("This is an error");
                    done();
                } else {
                    resolve(result);
                }
            })
        });
    }
}

exports.Sessions = Sessions;