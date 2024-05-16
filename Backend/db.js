const mongoose=require('mongoose');

const mongoURI="mongodb://0.0.0.0/inotebook";

async function connectToMongo(){
   await mongoose.connect(mongoURI).then(()=>{
    console.log("connected to successfully")
   }).catch(err=>{
    console.log(err)
   });
}

module.exports= connectToMongo;