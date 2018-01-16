const hbs = require('express-hbs')

var { Sessions } = require('../models/sessions');
var { User } = require('../models/user');
var { Weapon } = require('../models/weapon');

var dataHelper = require("../models/helpers/helper.data");
var formattingHelper = require("../models/helpers/helper.formatting");


module.exports = function(app, appEnv) {
  
    // Show all sessions
    app.get('/sessions', (req, res) => {
        var sessions = new Sessions();

        sessions.getAll()
            .then(function(result) {
                res.render('sessions', {data: result});
            })
            .catch(function(error) { console.log(error) });
    });
}