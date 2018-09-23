var utils = require('util');
var events = require('events');
var emt = events.EventEmitter;

function MusicPlayer() {
    events.EventEmitter.call(this);
}

utils.inherits(MusicPlayer, events.EventEmitter);

var audiodevice = {
    play() {

    },
    stop() {

    }
};

function MusicPlayer() {
    this.playing = false;
    emt.call(this);
}

utils.inherits(MusicPlayer, emt);

var musicPlayer = new MusicPlayer();


// musicPlayer.on('error', err => {
//     console.log('_________err', err)
// });

// musicPlayer.emit('play')

musicPlayer.on('newListener', (name, listener) => {
    console.log('name:', name);
});

musicPlayer.on('play', function() {
    // throw new Error('hahha');
    this.emit('error', 'ghs')
});