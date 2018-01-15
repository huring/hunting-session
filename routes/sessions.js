const hbs = require('express-hbs')

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
        var cursor = db.collection('hunting_sessions').find().toArray(function(err, result) {
            res.render('sessions', {data: result});
        });
    });
}