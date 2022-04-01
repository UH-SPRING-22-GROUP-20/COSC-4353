const mysql = require("../db")

function pricingMod(){

    // this is to check if user already has history for historyFactor
    // do i need to initialize connection to database here or is it global?

    var username //where do i get this from? is this also global?
    var sql = 'SELECT COUNT(*) AS rowsCount FROM fuelquote WHERE username = '
    mysql.query(sql, [username], function(err, rows, fields) {
        if (err) throw err;
        console.log('Query result: ', rows);
    });
//-----------------------------------------------------------------------------
    var history = rows[0].rowsCount
    var currentPrice = 1.5;
    var margin = 0;
    var suggestedPPG = 0;
    var total = 0;
    var location = documnet.getElementId("state").value;
    var locationFactor = 0;
    var historyFactor = 0;
    var gallons = documnet.getElementId("gallons").value;
    var gallonsFactor = 0;
    var profitFactor = .1;
//-----------------------------------------------------------------------------
    if (location = "TX"){
        locationFactor = .02;
    } else {
        locationFactor = .04;
    }

    if (history > 1){
        historyFactor = .1;
    } else {
        historyFactor = 0;
    }

    if (gallons > 1000){
        gallonsFactor = .02;
    } else {
        gallonsFactor = .03;
    }
//-----------------------------------------------------------------------------

    margin = currentPrice * (locationFactor - historyFactor + gallonsFactor + profitFactor);
    suggestedPPG =  currentPrice + margin;
    total = gallons * suggestedPPG;

}