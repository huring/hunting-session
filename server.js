const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const hbs = require('express-hbs')
const moment = require('moment');

var db

MongoClient.connect('mongodb://dev:dev@ds161306.mlab.com:61306/huntingsession-dev', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}));

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/layout/default'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    var cursor = db.collection('hunting_sessions').find().toArray(function(err, result) {

      let totals = [];

      if (result.length !== 0) {
        var key = {
          distance: 0,
          shotsFired: 0,
          kills: 0,
          lastLocation: result[result.length-1].location,
          duration: 0
        };

        result.forEach(element => {
          key.distance += parseInt(element.distance);
          key.shotsFired += parseInt(element.shotsFired);
          key.kills += parseInt(element.kills);
          key.duration += parseInt(element.duration);

          // console.log(parseInt(element.duration));

        });

        totals.push({key: 'distance', value: key.distance});
        totals.push({key: 'shotsFired', value: key.shotsFired});
        totals.push({key: 'kills', value: key.kills});
        totals.push({key: 'lastLocation', value: result[result.length-1].location});
        totals.push({key: 'duration', value: key.duration});


      }




      // console.log(totals.distance);

      // console.log(result);
      res.render('sessions', {data: result, total: totals});
    });
});

app.post('/add_session', (req, res) => {
  
  db.collection('hunting_sessions').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })

})