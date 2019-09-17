const express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded());
var Joi = require("joi")
var sql = require('mssql/msnodesqlv8');
var config = {
    user:"ETERNUS\\maitraiya.mali",
    password:" ",
    database:"Node_Product",
    driver: 'msnodesqlv8',
    server:"(LocalDB)\\v11.0",
    options: {
        trustedConnection : true
        }
}
app.get('/',function(req,res){

    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("select * from Product")
        }).then(result => {
          let rows = result.recordset
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.status(200).json(rows);
          sql.close();
        }).catch(err => {
          res.status(500).send({ message: `${err}`})
          sql.close();
        });
});
app.post('/',function(req,res){
    var result = validateCourse(req.body)
    if(result.error){
        return res.status(404).send(result.error.details[0].message)
    }
    new sql.ConnectionPool(config).connect().then(pool => {
        console.log(req.body.name);
        console.log(parseInt(req.body.price));
        return pool.request().query("insert into product(prod_name,prod_price) values('"+req.body.name+"',"+req.body.price+");")
        }).then(res => {
          res.status(200).send(req.body.name+" "+req.body.price);
          sql.close();
        }).catch(err => {
          res.status(500).send({ message: `${err}`})
          sql.close();
        });
});

app.get('/:id',function(req,res){
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("select * from Product where prod_id="+req.params.id)
        }).then(result => {
          let rows = result.recordset
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.status(200).json(rows);
          sql.close();
        }).catch(err => {
          res.status(500).send({ message: `${err}`})
          sql.close();
        });
});
app.delete('/:id',function(req,res){
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("delete from product where prod_id="+req.params.id)
        }).then(result => {
          res.status(200)
          sql.close();
        }).catch(err => {
          res.status(500).send({ message: `${err}`})
          sql.close();
        });
});
app.put('/:id',function(req,res){
    new sql.ConnectionPool(config).connect().then(pool => {
        console.log(req.body.name);
        console.log(parseInt(req.body.price));
        return pool.request().query("update product set prod_name='"+req.body.name+"',prod_price="+req.body.price+" where prod_id="+req.params.id)
        }).then(res => {
          res.status(200).send(req.body.name+" "+req.body.price);
          sql.close();
        }).catch(err => {
          res.status(500).send({ message: `${err}`})
          sql.close();
        });
});

const validateCourse=(body)=>{
    const schema={
        name:Joi.string().min(3).required(),
        price:Joi.number().min(1).required()
    }
    var result = Joi.validate(body,schema);
    return result;
}
var server = app.listen(3000,function(){
    console.log("Listening at 3000")
});
