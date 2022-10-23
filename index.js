const express = require('express');
const app = express();
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.static( path.join(__dirname, 'public') ))


app.get('/', (req, res)=>{
    res.statusCode = 200;
    res.render('index')
})
app.get('/perguntar', (req, res)=>{
    res.statusCode = 200;
    res.render('perguntar')
})



app.use((req, res)=>{
    res.statusCode = 404;
    res.send('404 not found');
})

app.listen(process.env.PORT_SERVER);