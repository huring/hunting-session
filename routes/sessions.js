const hbs = require('express-hbs')

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
    app.get('/sessions', (req, res) => {

        var sessions = new Sessions();
        sessions.name = "My name...";
        var sessionId = req.params.session_id;

        console.log(sessions);

        sessions.getAll()
            .then(function(result) { 
                res.render('sessions', {data: result});
            })
            .catch(function(error) { });
    });
}