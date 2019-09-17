const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write('Hello world');
        res.end();
    }
    if(req.url==='/api/courses'){
        res.write(JSON.stringify(
            [{title:'Machine Learning',author:'Max',price:'1000'},
            {title:'ReactJS',author:'John',price:'5000'},
            {title:'NodeJS',author:'Ashley',price:'700'}]
        ));
        res.end();
    }
});

server.on('connection',(socket)=>{
    console.log('Added a connection');
})

server.listen(3000);
