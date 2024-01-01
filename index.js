const request = require('request');
var fs = require('fs');

var proxyList = fs.readFileSync('proxy.txt').toString().split("\n");
proxyList.forEach(async function(x) {
    console.log(x);
    r = request.defaults({'proxy': 'http://' + x});
    r.get('https://www.google.com', function(err, res, body) {
        if (err) {
            console.log(`Proxy ${x} is not working`);
            fs.appendFileSync('notworking.txt', x + '\n');
        } else {
            if (res.statusCode == 200) {
                console.log(`Proxy ${x} is working`);
                fs.appendFileSync('working.txt', x + '\n');
            } else {
                console.log(`Proxy ${x} is not working`);
                fs.appendFileSync('notworking.txt', x + '\n');
            }
        }
    });
});