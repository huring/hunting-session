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
app.use('/css', expressLess(publicPath + '/less', { debug: true }));

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
    
            });
    
            totals.push(addKeyValue('Distance', key.distance, 'km', 'bg-ming'));
            totals.push(addKeyValue('Shots fired', key.shotsFired, 'st', 'bg-kelly'));
            totals.push(addKeyValue('Kills', key.kills, 'st', 'bg-forest'));
            totals.push(addKeyValue('Last location', result[result.length-1].location, '', 'bg-ming'));
            totals.push(addKeyValue('Duration', key.duration, 'h', 'bg-emerald'));
            totals.push(addKeyValue('Sessions', key.sessionCount, '', 'bg-crayola'));
          }
        
          res.render('stats', {data: totals, comment: result[Math.floor(Math.random()*result.length)].commentText});
        
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

function addKeyValue(key, val, suffix, col) {
  return {
    key: key,
    value: val,
    suffix: suffix,
    color: col
  };
}

hbs.registerHelper('formatDateTime', function(text, options) {
  return text;
});