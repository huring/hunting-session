const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const hbs = require('express-hbs')
const path = require('path');
const expressLess = require('express-less');
const fileUpload = require('express-fileupload');

var appEnv = {};

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
app.use(fileUpload());


app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  defaultLayout: __dirname + '/views/layout/default'
}));

app.set('view engine', 'hbs');

require('./routes')(app, appEnv);

hbs.registerHelper('formatDateTime', function(text, options) {
  return text;
});