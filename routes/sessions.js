module.exports = function(app, appEnv) {

    // Show all sessions
    app.get('/sessions', (req, res) => {
    
        var cursor = db.collection('hunting_sessions').find().toArray(function(err, result) {
        res.render('sessions', {data: result});
        });

    });

}