const Sequelize = require('sequelize');
const connection = require('./database/database');

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    respostaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});
module.exports = Resposta;

