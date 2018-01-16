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
    
    get weapon() { return this['_weapon']; }
    set weapon(weapon) { this['_weapon'] = weapon; }
}

exports.HuntingSession = HuntingSession;