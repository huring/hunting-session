const hbs = require('express-hbs')

hbs.registerHelper('formatArray', function(text) {
    
    let s = [];

    if (typeof(text) !== "object") {
        console.log("Add to array");
        s.push(text);
    } else {
        s = text;
    }

    return s.map(function(str) {
        let s = str.split(',')
        return  "<div>Kaliber: " + s[0] + "<br/>" +
                "Dödande skott: " + s[1] + "<br/>" +
                "Djur: " + s[2];
    });
});