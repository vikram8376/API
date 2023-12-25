const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Profilerouter = require('./Router/Routers.js');

const app = express();
app.use(bodyParser.json());
app.use(cors())


const port = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/LoginData",{
}).then(()=>{
    console.log("Mongodb Sussfully Connected")
}).catch((err) =>{
    console.error(err);
})



app.use('/', Profilerouter);



app.listen(port, () => {
    console.log(`Server Running On the ${port}`);
  });