const hbs = require('express-hbs')
const ObjectId = require('mongodb').ObjectID;

var { Sessions } = require('../models/sessions');

module.exports = function(app, appEnv) {

    hbs.registerHelper('formatArray', function(text) {

        let s = [];

        if (typeof(text) !== "object") {
            console.log("Add to array");
            s.push(text);
        } else {
            s = text;
        }

        return s.map(function(str) {
            let s = str.split(',')
            return  "<div>Kaliber: " + s[0] + "<br/>" +
                    "Dödande skott: " + s[1] + "<br/>" +
                    "Djur: " + s[2];
        });
    });
  
    // Show all sessions
    app.get('/sessions/:session_id', (req, res) => {

        var session = new Sessions();
        session.session_id = req.params.session_id;

        session.getSingle()
            .then(function(result) { 
                res.render('session-details', {data: result});
            })
            .catch(function(error) { });

    });
}