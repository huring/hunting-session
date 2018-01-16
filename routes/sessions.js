const hbs = require('express-hbs')

var { Sessions } = require('../models/sessions');
var { HuntingSession } = require('../models/huntingSession');
var { User } = require('../models/user');
var { Weapon } = require('../models/weapon');

var dataHelper = require("../models/helpers/helper.data");
var formattingHelper = require("../models/helpers/helper.formatting");

const ObjectId = require('mongodb').ObjectID;


module.exports = function(app, appEnv) {

    // Show all sessions
    app.get('/sessions', (req, res) => {
        var sessions = new Sessions();
        
        sessions.getAll()
            .then(function(result) {

                var shootingSessions = [];

                result.forEach(function(element) {
                    var hunt = new HuntingSession(element);
                    console.log(hunt.getWeaponUsed())

                    shootingSessions.push(hunt);
                }, this)
                
                console.log(shootingSessions);
                return shootingSessions;
                
            }).then((shootingSessions) => {
                res.render('sessions', {data: shootingSessions});
            })
            .catch(function(error) { console.log(error) });
    });
}