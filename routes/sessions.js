const hbs = require('express-hbs')

var { Sessions } = require('../models/sessions');
var { HuntingSession } = require('../models/huntingSession');
var { User } = require('../models/user');
var { Weapon } = require('../models/weapon');

var formattingHelper = require("../models/helpers/helper.formatting");


module.exports = function(app, appEnv) {

    // Show all sessions
    app.get('/sessions', (req, res) => {
        var sessions = new Sessions();
        var weapon = new Weapon();
        
        var huntingSessions = sessions.getAll()
            .then(function(result) {
                var hs = result.map((item) => {
                   return new HuntingSession(item);
                });

                return hs;
            })
            .catch((err) => { throw new Error(err) });

        var weaponsUsed = weapon.getAll()
            .then((result) => {
                return result;
            })
            .catch((err) => { throw new Error(err) });

        var result = Promise.all([huntingSessions, weaponsUsed]);
           
            result.then((data) => {
                var hunts = data[0];
                var w = data[1];

                // Super f*ing ugly hack...
                hunts.map((item) => {
                    w.forEach(function(element) {
                        if (item.weapon == element._id) {
                            item.weapon = element;
                        }   
                    }, this);
                })

                res.render('sessions', {data: data[0]});
            })
            .catch((error) => {
                throw new Error(error);
            })               
    });
}