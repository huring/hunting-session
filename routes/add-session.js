var { HuntingSession } = require('../models/classes/huntingSession.class');
var { Weapon } = require('../models/classes/weapon.class');

var { User } = require('../models/user');

module.exports = function(app, appEnv) {

    const moment = require('moment');

    // Form to add sessions
  app.get('/add', (req, res) => {
  
    content = {
      timestamp: moment().format("MMMM Do YYYY, HH:mm")
    };
  
    var user = new User();

    // Get users weapon collection
    user.getWeaponCollection().then((weapons) => {
      res.render('form', {data: content, weapons});
    });
  
  });
  
  // Post new session to database
  app.post('/add_session', (req, res) => {

    var huntingSession = new HuntingSession({
      uid: appEnv.user.oid,
      location: req.body.location,
      duration: req.body.duration,
      distance: req.body.distance,
      shotsFired: req.body.shot_1,
      kills: req.body.kills,
      commentText: req.body.commentText,
      timestamp: req.body.timestamp,
      file: 'missing-image.png',
      animalType: req.body.animalType,
      weapon: req.body.weaponModelUsed
    });

    huntingSession.add()
    .then(() => {
      console.log("Saved to database");
      res.redirect('/')
    })
    .catch((error) => { throw new Error(error) })

  })
}