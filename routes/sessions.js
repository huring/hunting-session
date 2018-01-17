const hbs = require('express-hbs')

var { Sessions } = require('../models/sessions');
var { HuntingSession } = require('../models/classes/huntingSession.class');
var { Weapon } = require('../models/weapon');

var formattingHelper = require("../models/helpers/helper.formatting");


module.exports = function(app, appEnv) {

    // Show all sessions
    app.get('/sessions', (req, res) => {
        
        var huntingSession = new HuntingSession();
        var weapon = new Weapon();

        var hsPromise = huntingSession.getAll()
            .then((result) => {
                return result;
            }).catch((err) => { throw new Error(err) });

        var weaponPromise = weapon.getAll()
            .then((result) => {
                return result;
            }).catch((err) => { throw new Error(err) });

        var body = Promise.all([hsPromise, weaponPromise]);
        
        body.then((data) => {
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

        }).catch((err) => { throw new Error(err) });           
    });
}