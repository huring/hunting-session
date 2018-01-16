"use strict"

const ObjectId = require('mongodb').ObjectID;

class Weapon { 

    constructor(obj) {

        if (obj) {
            this.uid = 1;                       // User-id needs to be set with code...
            this._type = obj.weaponType;
            this._model = obj.weaponModel;
            this._caliber = obj.weaponCaliber;
        }
        
    };

    get type() { return this._type; }
    set type(type) { this._type = type; }

    get model() { return this._model; }
    set model(model) { this._model = model; }

    get caliber() { return this._caliber; }
    set caliber(caliber) { this._caliber = caliber; }

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
}

exports.Weapon = Weapon;