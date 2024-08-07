const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRoute=require('./routes/admin')
const userRoute=require('./routes/user')
const cors = require('cors');


app.use(cors())
app.use(bodyParser.json())
app.use('/user',userRoute)
app.use('/admin',adminRoute)


app.listen(5000,()=>{
    console.log("Listening on 5000 port")
})