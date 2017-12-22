module.exports = function(app, appEnv) {
    require('./main')(app, appEnv);
    require('./sessions')(app, appEnv);
    require('./add-session')(app, appEnv);
}