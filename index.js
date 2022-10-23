const path = require("path");
const express = require("express");
const app = express();

// env module configuration
const dotenv = require("dotenv");
dotenv.config();

// authentication with the database
const connection = require("./model/database/database");
connection
  .authenticate()
  .then(() => {
    console.log("successful connection");
  })
  .catch((e) => {
    console.log("error connecting to database" + e);
  });

// template engine and static files
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Data reading settings for forms and json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Models
const Pergunta = require("./model/Pergunta");
const Resposta = require("./model/Resposta");

// Routes
app.get("/", (req, res) => {
  res.statusCode = 200;
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.statusCode = 200;
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    let { titulo, descricao } = req.body;
    Pergunta.create({
      titulo: titulo,
      descricao: descricao,
    }).then(() => {
      res.statusCode = 308;
      res.redirect("/");
    });
  });



app.get("/responder/:id", (req, res) => {
  res.statusCode = 200;
  let { id } = req.params;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta !== null) {
      Resposta.findAll({
        raw: true,
        order: [["respostaId", "DESC"]],
        where: { respostaId: pergunta.id },
      }).then((respostas) => {
        res.render("responder", {
          pergunta: pergunta,
          respostas: respostas,
        });
      });
    } else {
      res.statusCode = 308;
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  let { corpo, respostaId } = req.body;
  Resposta.create({
    corpo: corpo,
    respostaId: respostaId,
  }).then(() => {
    res.statusCode = 308;
    res.redirect(`responder/${respostaId}`);
  });
});

// 404
app.use((req, res) => {
  res.statusCode = 404;
  res.render('404')
});

// server
app.listen(process.env.PORT_SERVER);
