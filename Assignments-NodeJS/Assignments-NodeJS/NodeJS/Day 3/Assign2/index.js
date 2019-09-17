function getCustomer(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve({
                id:id,
                name:'Maitraiya Mali',
                isGold:true,
                email:'maitraiya@gmail.com'
            });
        },2000);
    
    });
}
function getTopMovies(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(['Movie1','Movie2'])
        },2000);
    });
}
function sendEmail(email,movies){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },2000);    
    });
}
async function notifyCustomer(){
    const customer = await getCustomer(1);
    console.log(customer)
    if(customer.isGold){
        const movies = await getTopMovies();
        console.log(movies);
        const email = await sendEmail(customer.email,movies);
        console.log("Email sent to",customer.email);
    }    
}
notifyCustomer();

