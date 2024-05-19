const connectToMongo=require('./db');
const express = require('express');
var cors=require('cors')

connectToMongo();
const app = express()
const port = process.env.PORT || 5000 ;
app.use(cors(
  {
   // https://i-notebook-frontend-pearl.vercel.app
      origin:"*" ,
      methods: ["POST" , "GET" ,"PUT" ],
      credentials:true
  }
))

app.use(express.json())
//Available Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})



