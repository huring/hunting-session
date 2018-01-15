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
                user.weaponCollection().then((weapons) => {
                    res.render('user', {data: result, weapons: weapons});
                });
                
            })
            .catch(function(err) {
               console.log(err);
            });

        
    });

    app.post('/me/add_weapon', (req,res) => {
        console.log(req);

        var weapon = new Weapon(req.body);
        db.collection('weapons').insert(weapon, (err, result) => {
            if (err) return console.log(err)
            console.log('saved to database')
            res.redirect('/me')
        });
    })

}