const request = require('request-promise');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./www'));
http.listen(30000, () => console.log('listening on port 30000'));

app.get('/arrivals', (req, res) => {
    request('https://trimet.org/ws/int/v2/arrivals?json=true&arrivals=3&minutes=60&locIDs=13589,12402,2282').then(data => {
        res.status(200).send(data);
    });
});

io.on('connection', (socket) => {
    console.log('user connected');
});

setTimeout(() => {
    console.log('emitting...')
    io.emit('update', 'HELLO!');
}, 2000)