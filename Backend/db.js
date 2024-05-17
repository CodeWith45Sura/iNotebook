const mongoose=require('mongoose');

const mongoURI="mongodb+srv://sureshkcp77:<Suresh@78910>@inotebook.ei6qjvh.mongodb.net/test?retryWrites=true&w=majority&appName=iNotebook";

async function connectToMongo(){
   await mongoose.connect(mongoURI).then(()=>{
    console.log("connected to successfully")
   }).catch(err=>{
    console.log(err)
   });
}

module.exports= connectToMongo;
