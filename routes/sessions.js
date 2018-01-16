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
                var weapon = new Weapon();

                result.forEach(function(element) {
                    
                    var hunt = new HuntingSession(element);
                    // console.log(hunt)
                    weapon.getByID(hunt.weapon).then((result) => {
                        // console.log(result);
                        hunt.weapon = result;
                        // console.log(hunt);
                        shootingSessions.push(hunt);
                        
                        return hunt;

                    })

                }, this)
                
                console.log(shootingSessions);
                return hunt;

                
            }).then((val) => {
                // console.log(val);
                res.render('sessions', {data: val});
            })
            .catch(function(error) { console.log(error) });
    });
}