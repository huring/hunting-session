var { Weapon } = require('../models/weapon');

class HuntingSession {

    constructor(obj) {

        // console.log(obj);

        if (obj) {
            this['_id'] = obj._id;
            this['_uid'] = obj.uid;
            this['_location'] = obj.location;
            this['_duration'] = obj.duration;
            this['_distance'] = obj.distance;
            this['_kills'] = obj.kills;
            this['_commentText'] = obj.commentText;
            this['_timestamp'] = obj.timestamp;
            this['_file'] = obj.file;
            this['_animalType'] = obj.animalType;
            this['_weapon'] = obj.weapon;
        }

            //_id: obj.id
           // uid: obj.user_id
           // location: obj.location
           // duration: obj.duration
           // distance: obj.distance
           // shotsFired: obj.shot_1
           // kills: obj.kills
            //commentText: obj.commentText
           // timestamp: obj.timestamp
           // file: 'missing-image.png'
          //  animalType: obj.animalType
           // weapon: obj.weaponModelUsed
    }


    // Public variables
    get id() { return this['_id']; }
    get uid() { return this['_uid']; }
    get location() { return this['_location']; }
    get duration() { return this['_duration']; }
    get distance() { return this['_distance']; }
    get kills() { return this['_kills']; }
    get comment() { return this['_commentText']; }
    get timestamp() { return this['_timestamp']; }
    get image() { return this['_file']; }
    get animalType() { return this['_animalType']; }
    
    get weapon() { return this.getWeaponUsed(); }
    // set weapon(weapon) { this['_weapon'] = weapon; }

    // Methods
    getWeaponUsed() {
        var weapon = new Weapon();
        weapon.getByID(this['_weapon']).then((result) => {
            // console.log(result);
            return result;
        }).catch((error) => {
            throw new Error(error);
        })
    }
}

exports.HuntingSession = HuntingSession;