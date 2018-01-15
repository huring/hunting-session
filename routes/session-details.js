const hbs = require('express-hbs')
const ObjectId = require('mongodb').ObjectID;

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

        var sessionId = req.params.session_id;
        var cursor = db.collection('hunting_sessions').findOne({_id: ObjectId(sessionId)}, function(err, result) {
            console.log(result);
            res.render('session-details', {data: result});
        });
    });
}