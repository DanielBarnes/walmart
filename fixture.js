var request = require('request');
var async = require('async');
var fs = require('fs');
var util = require('util');
var productIds = [ 
    14225185,
    14225186,
    14225188,
    14225187,
    39082884,
    30146244,
    12662817,
    34890820,
    19716431,
    42391766,
    35813552,
    40611708,
    40611825,
    36248492,
    44109840,
    23117408,
    35613901,
    42248076
];

var apiKey = 'kjybrqfdgp3u4yv2qzcnjndj';

var data = []

async.eachLimit(productIds, 1, function _asyncItor(id, cb) {
    var url = util.format('http://api.walmartlabs.com/v1/items/%s?format=json&apikey=%s', id, apiKey);
    console.log ('requesting: %s', url);
    request.get(url, function (err, res, body) {
        if (err) return cb(err);
        body = JSON.parse(body);
        if (body.errors) {
            console.log('too fast waiting');
            setTimeout(function () {
                _asyncItor(id, cb);
            }, 1000);
        } else {
            data.push(body);
            return cb();
        }
    });
}, function (err) {
    if (err) {
        console.log(err);
    }
    fs.writeFile('./data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            console.log(err);
        }
        console.log('done');
        process.exit();
    });
});
