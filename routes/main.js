module.exports = function(app, appEnv) {

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
      
              totals.push(addKeyValue('Distance', key.distance, 'km', 'color1', 'settings_ethernet', 'distance'));
              totals.push(addKeyValue('Shots fired', key.shotsFired, 'st', 'color2', 'gps_not_fixed', 'shotsFired'));
              totals.push(addKeyValue('Kills', key.kills, 'st', 'color3', 'my_location', 'kills'));
              totals.push(addKeyValue('Last location', result[result.length-1].location, '', 'color4', 'near_me', 'location'));
              totals.push(addKeyValue('Duration', key.duration, 'h', 'color5', 'timer', 'duration'));
              totals.push(addKeyValue('Sessions', key.sessionCount, '', 'color6', 'archive'));
            }
          
            var rnd = Math.floor(Math.random()*result.length);
  
            res.render('stats', {data: totals, 
                random: {
                    comment: result[rnd].commentText, 
                    date: result[rnd].timestamp, 
                    location: result[rnd].location,
                    image: './uploads/' + result[rnd].file
                  }
                });
          
          });
  
  });
  
  // Show all sessions
  app.get('/ajax_test', (req, res) => {
    var cursor = db.collection('hunting_sessions').find({}, req.query).toArray(function(err, result) {
      console.log(result);
      res.send(result);
    });  
  });

  function addKeyValue(key, val, suffix, col, icon, type) {
    return {
      key: key,
      value: val,
      suffix: suffix,
      color: col,
      icon: icon,
      type: type
    };
  }

}