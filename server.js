const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const hbs = require('express-hbs')
const moment = require('moment');
const path = require('path');
const expressLess = require('express-less');

var db
const publicPath = path.join(__dirname, '/views');
app.use('/less-css', expressLess(publicPath + '/less', { debug: true }));

MongoClient.connect('mongodb://dev:dev@ds161306.mlab.com:61306/huntingsession-dev', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.use('/', express.static(publicPath));
app.use(bodyParser.urlencoded({extended: true}));


app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/layout/default'
}));

app.set('view engine', 'hbs');

// Show summary cards
app.get('/', (req, res) => {

  var cursor = db.collection('hunting_sessions').find().toArray(function(err, result) {
    
          let totals = [];
    
          if (result.length !== 0) {
            var key = {
              distance: 0,
              shotsFired: 0,
              kills: 0,
              lastLocation: result[result.length-1].location,
              duration: 0,
              sessionCount: result.length
            };
    
            result.forEach(element => {
              key.distance += parseInt(element.distance);
              key.shotsFired += parseInt(element.shotsFired);
              key.kills += parseInt(element.kills);
              key.duration += parseInt(element.duration);
              // console.log(parseInt(element.duration));
    
            });
    
            totals.push({key: 'Distance', value: key.distance, suffix: "km", color: "."});
            totals.push({key: 'Shots fired', value: key.shotsFired, suffix: "st"});
            totals.push({key: 'Kills', value: key.kills, suffix: "st"});
            totals.push({key: 'Last location', value: result[result.length-1].location});
            totals.push({key: 'Duration', value: key.duration, suffix: "h"});
            totals.push({key: 'Sessions', value: key.sessionCount});
          }
        
          res.render('stats', {data: totals});
        
        });

});

// Show all sessions
app.get('/sessions', (req, res) => {
    var cursor = db.collection('hunting_sessions').find().toArray(function(err, result) {
      res.render('sessions', {data: result});
    });
});

// Form to add sessions
app.get('/add', (req, res) => {

  content = {
    timestamp: moment().format("MMMM Do YYYY, HH:mm")
  };

  res.render('form', content);  
});

// Post new session to database
app.post('/add_session', (req, res) => {
  db.collection('hunting_sessions').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

hbs.registerHelper('formatDateTime', function(text, options) {
  return text;
});