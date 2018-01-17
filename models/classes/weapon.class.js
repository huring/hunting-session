"use strict"

const ObjectId = require('mongodb').ObjectID;

class Weapon { 

    constructor(obj) {

        if (obj) {
            this.uid = 1;                       // User-id needs to be set with code...
            this.type = obj.weaponType;
            this.model = obj.weaponModel;
            this.caliber = obj.weaponCaliber;
        }
        
    };

    add() {
        return new Promise((resolve, reject) => {
            db.collection('weapons').insert(this, (err, result) => {
                if (err) return reject(err);
                resolve("Saved to database");
            });
        });
    }

    getByID(id) {
        return new Promise((resolve, reject) => {
            db.collection('weapons').findOne({_id: ObjectId(id)}, (err, result) => {
                if (err)
                    throw new Error(err);
                resolve(result);
            });
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            db.collection('weapons').find().toArray((err, result) => {
                if (err)
                    throw new Error(err);
                resolve(result);
            });
        })
    }
}

exports.Weapon = Weapon;