const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://dev:dev@ds161306.mlab.com:61306/huntingsession-dev', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    var cursor = db.collection('hunting_sessions').find().toArray(function(err, result) {
      console.log(result);

      res.render('index.ejs', {sessions:result});
    });
});

app.post('/add_session', (req, res) => {
  
  db.collection('hunting_sessions').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })

})