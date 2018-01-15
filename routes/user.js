const hbs = require('express-hbs')
var { User } = require('../models/user');
var { Weapon } = require('../models/weapon');

module.exports = function(app, appEnv) {
  
    // Show user info
    app.get('/me', (req, res) => {
        var user = new User();

        // Query database and get user
        user.getByID()
            .then(function(result) {

                // Get users weapon collection
                user.getWeaponCollection().then((weapons) => {
                    res.render('user', {data: result, weapons: weapons});
                });

            })
            .catch(function(err) {
               throw new Error(err);
            });

        
    });

    app.post('/me/add_weapon', (req,res) => {
        
        var weapon = new Weapon(req.body);

        weapon.add().then((result) => {
            res.redirect('/me')
        }).catch((error) => { throw new Error(err); });
    })
}