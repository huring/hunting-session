var { User } = require('../models/user');
var { Weapon } = require('../models/weapon');

module.exports = function(app, appEnv) {

    const moment = require('moment');

    // Form to add sessions
  app.get('/add', (req, res) => {
  
    content = {
      timestamp: moment().format("MMMM Do YYYY, HH:mm")
    };
  
    var user = new User();
    var weapon = new Weapon();

    weapon.getByID("5a5cc76154bc001de49bf4e7").then((result) => {
      console.log(result);
    });

    // Get users weapon collection
    user.getWeaponCollection().then((weapons) => {
      res.render('form', {data: content, weapons});
    });


    
  
  });
  
  // Post new session to database
  app.post('/add_session', (req, res) => {

    var user = new User();
  
    let session = {
      uid: user.id,
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
    };
  

    let imageFile = req.files.imageFile;

    if (imageFile === undefined) {
      session.file = "missing-image.png"
    } else {
      session.file = imageFile.name
    }

    console.log(session);

    db.collection('hunting_sessions').save(session, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    });

      // Let's skip image saving for now
      // TODO: Upload image to cloud service... 

        //imageFile.mv('/Users/huring/Documents/GitHub/hunting-session/views/uploads/' + imageFile.name, function(err) {
        
        //  if (err)
        //    return res.status(500).send(err);
    
          // Save to database
//          db.collection('hunting_sessions').save(session, (err, result) => {
//            if (err) return console.log(err)
//            console.log('saved to database')
//            res.redirect('/')
//          })
//      });
  })
}