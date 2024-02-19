// Configurações

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;


// DB
const DB = require('./db/connection');


// Template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// Importação de Rotas
const noteRoutes = require('./routes/notes');


// Rotas
app.get('/', async (req, res) => {

    const notes = await DB.getDB().db().collection('notes').find({}).toArray();
    res.render('home', {notes});

});

app.use('/notes', noteRoutes);

DB.initDB((err, db) => {
   if(err){
        console.log(err);
    } else {
        console.log('Conectado ao banco de dados');
        app.listen(port, () => {
            console.log(`Projeto rodando na porta: ${port}`);
            console.log('http://localhost:8000')
        })
    }
})
