var express = require('express')
var Joi = require('joi');
var app = express();
const movies =[{id:1,title:'Uri:Story of surgical strike',genre:'action'},
                {id:2,title:'Jab we Met',genre:'romantic'},
                {id:3,title:'Bajirao Mastani', genre:'historic'}
                ]
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello world');
});
app.get('/api/movies',(req,res)=>{
    return res.send(movies);
});
app.get('/api/movies/:id',(req,res)=>{
    let movie = movies.find(c => c.id===parseInt(req.params.id));
    if(!movie)
    return res.status(404).send('ID not found');
    return res.send(movie)
});
app.post('/api/movies/',(req,res)=>{
    var result = validateCourse(req.body)
    if(result.error){
        return res.status(404).send(result.error.details[0].message)
    }
    let len = movies.length-1;
    id =(movies[len].id)+1 
    let movie={
        id:id,
        title:req.body.title,
        genre:req.body.genre
    }
    movies.push(movie);
    return res.send(movies);
});
app.put('/api/movies/:id',(req,res)=>{
    var movie = movies.find(c=>c.id===parseInt(req.params.id));
    if(!movie)
    return res.status(404).send('ID not found');
    
    var result = validateCourse(req.body);
    if(result.error)
    return res.status(404).send(result.error.details[0].message)

    movie.title=req.body.title
    movie.genre=req.body.genre
    return res.send(movies)
});
app.delete('/api/movies/:id',(req,res)=>{
    var movie = movies.find(c=>c.id===parseInt(req.params.id));
    if(!movie)
    return res.status(404).send('ID not found');

    var index = movies.indexOf(movie);
    movies.splice(index,1)
    return res.send(movies);
})
const validateCourse=(body)=>{
    const schema={
        title:Joi.string().min(3).required(),
        genre:Joi.string().min(3).required()
    }
    var result = Joi.validate(body,schema);
    return result;
}

const port = process.env.PORT || 3000
app.listen(port,()=>{console.log(`Listening on port ${port}`)})