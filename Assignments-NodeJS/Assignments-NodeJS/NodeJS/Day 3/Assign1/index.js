var express = require('express');
var helmet = require('helmet');
var morgan = require('morgan');
var router = require('./router/index');
var app = express();

app.set('view engine','pug');
app.set('views','./views');
app.use((req,res,next)=>{
    console.log('Api Requested with '+req.method+' method');
    next();
})
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use('/api/movies',router);
app.get('/',(req,res)=>{
    res.render('index',{title:'Movie Api',message:'Hello world'});
});
if(app.get('env')=='development')
{
    app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000
app.listen(port,()=>{console.log(`Listening on port ${port}`)})