const mongoose = require('mongoose');
const express = require('express');
const app = express();
const users = require('./users');
const auth = require('./auth');
const config = require('config');
const genres=  require('./genres');
const error = require('./middleware/error');
const winston = require('winston');

winston.add(new winston.transports.File({filename : 'logfile.log'}));

app.use(express.json());
app.use('/api/users',users);
app.use(express.urlencoded(extended=true));
app.use('/api/auth',auth);
app.use('/api/genres',genres);
app.use(error);


if(!config.get("jwtPrivateKey")){
    console.log("Fatal Error Private key not set")
    process.exit(1);
}
mongoose.connect("mongodb+srv://maitraiya:Mait2792580@cluster-k00st.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true })
.then(()=>console.log("Connected Successfully"))
.catch((error)=>console.log(error))
const port = process.env.PORT || 3000;
const server = app.listen(port,()=>console.log(`Listening on ${port}`))

module.exports = server;
