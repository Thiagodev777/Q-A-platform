const express = require('express');
const app = express();
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

// authenticate database
const connection = require('./model/database/database');
connection.authenticate().then(()=>{
    console.log('successful connection')
}).catch((e)=>{
    console.log('error connecting to database' + e);
})

// Models
const Pergunta = require('./model/Pergunta');

// template engine and statics
app.set('view engine', 'ejs');
app.use(express.static( path.join(__dirname, 'public') ));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/', (req, res)=>{
    res.statusCode = 200;
    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then((perguntas)=>{
        res.render('index', {
            perguntas: perguntas
        })
    })
})


app.get('/perguntar', (req, res)=>{
    res.statusCode = 200;
    res.render('perguntar')
})


app.post('/salvarpergunta', (req, res)=>{
    let { titulo, descricao } = req.body;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect('/');
    })
});



app.use((req, res)=>{
    res.statusCode = 404;
    res.send('404 not found');
})

app.listen(process.env.PORT_SERVER);