var logger = require('./logger');
logger('hello world');

const EventEmmiter = require('events');
const event = new EventEmmiter();
event.on('messageLogged',function(args){
    console.log('hello i am in listener and i have parameter ID as '+args.id );
})
event.emit('messageLogged',{id:1});