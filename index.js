const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.statusCode = 200;
    res.render('index')
})


app.listen(process.env.PORT_SERVER);