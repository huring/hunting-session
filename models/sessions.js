"use strict"

const ObjectId = require('mongodb').ObjectID;

class Sessions {

    constructor() {
        this._db_collection = 'hunting_sessions';
        this._session_id = null;
    }

    set db_collection(str) { this._db_collection = str; }
    get db_collection() { return this._db_collection; }
    
    set session_id(id) { this._session_id = id; }
    get session_id() { return this._session_id; }


    getAll() {

        var _this = this;

        return new Promise(function(resolve, reject) {
            db.collection(_this.db_collection).find().toArray(function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    getSingle() {

        var _this = this;
        console.log("Promise single result with ID");

        if (this.session_id === null) {
            throw new Error("Session ID is missing...");
        }

        return new Promise(function(resolve, reject) {
            db.collection(_this.db_collection).findOne({_id: ObjectId(_this.session_id)}, function(err, result) {
                if (err) {
                    reject(err);
                    done();
                } else {
                    resolve(result);
                }
            })
        });
    }
}

exports.Sessions = Sessions;