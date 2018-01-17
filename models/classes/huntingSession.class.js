class HuntingSession {

    constructor(obj) {

        if (obj) {
            this.id = obj._id;
            this.uid = obj.uid;
            this.location = obj.location;
            this.duration = obj.duration;
            this.distance = obj.distance;
            this.kills = obj.kills;
            this.commentText = obj.commentText;
            this.timestamp = obj.timestamp;
            this.file = obj.file;
            this.animalType = obj.animalType;
            this.weapon = obj.weapon;
        }
    }

    add() {
        return new Promise((resolve, reject) => {
            db.collection('hunting_sessions').insert(this, (err, result) => {
                if (err) return reject(err);
                resolve("Saved to database");
            });
        });
    }

    getByID(id) {
        return new Promise((resolve, reject) => {
            db.collection('hunting_sessions').findOne({_id: ObjectId(id)}, (err, result) => {
                if (err)
                    throw new Error(err);
                resolve(result);
            });
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            db.collection('hunting_sessions').find().toArray((err, result) => {
                if (err)
                    throw new Error(err);
                resolve(result);
            });
        })
    }

    getLocationsJson(query) {
        return new Promise((resolve, reject) => {

            db.collection('hunting_sessions').find({'location': {'$regex': query}}, {location:1}).toArray((err, result) => {
                if (err)
                    throw new Error(err);
                resolve(JSON.stringify(result));
            });

        });
    }
}

exports.HuntingSession = HuntingSession;