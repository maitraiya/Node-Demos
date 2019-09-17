const {validate} = require('../genre');

describe('validate',() =>{
    const genre = {
        name:"Comedy"
    }
    it("should return value as "+genre.name, ()=>{
        const result = validate(genre);
        expect(result).toMatchObject({value:{name:"Comedy"}});  
        expect(result).toMatchObject({error:null})
    })       
});

