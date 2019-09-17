let server;
const request = require('supertest');
const {Genre} = require('../genre');
const {user} = require('../user');

describe('/api/genres',()=>{
    beforeEach(()=>{server = require('../index')});
    afterEach(async()=>{
        server.close();
        await Genre.remove({});   
    });
    describe('get/ ',()=>{
        it('should return all genres',async ()=>{
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200);            
        });
        it('should save and return genre',async()=>{
            Genre.collection.insertMany([
                {name:"genre1"},
                {name:"genre2"}
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.body.length).toBe(2);         
        });
    });
    describe('get/id',()=>{
        it('should return genre with id',async ()=>{
            const genre = new Genre({name:'Genre1'});
            await genre.save();
            const res = await request(server).get('/api/genres/'+genre._id);
            expect(res.status).toBe(200);
        });
        it('should return genre status with 404',async ()=>{
            const res = await request(server).get('/api/genres/4');
            expect(res.status).toBe(404);
        });        
    });
    describe('post/ ',()=>{
        it('should return 401 if user not logged in ',async ()=>{
            const res = await request(server).post('/api/genres').send({name:"Genre1"});
            expect(res.status).toBe(401);
        }); 
        it('should return 403 if user is not a superadmin',async ()=>{
            const token = new user().generateAuthToken();
            const res = await request(server).post('/api/genres').send({name:"Ge"}).set('x-auth-token',token);
            expect(res.status).toBe(403);
        });
        it('should return 400 if genre is Invalid',async ()=>{
            const usertemp ={isSuperAdmin:true}
            const token = new user(usertemp).generateAuthToken();
            const res = await request(server).post('/api/genres').send({name:"Ge"}).set('x-auth-token',token);
            expect(res.status).toBe(400);

        });
        it('should return 200 if genre is valid',async ()=>{
            const usertemp ={isSuperAdmin:true}
            const token = new user(usertemp).generateAuthToken();
            const res = await request(server).post('/api/genres').send({name:"Genre1"}).set('x-auth-token',token);
            expect(res.status).toBe(200);
            
        });


    });
});
