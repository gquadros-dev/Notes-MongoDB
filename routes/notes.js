const Router = require('express').Router
const db = require('../db/connection');
const { ObjectId } = require('mongodb');

const router = Router()

//View de detalhes da nota
router.get('/:id', async (req, res) => {

    const id = new ObjectId(req.params.id);

    const note = await db.getDB().db().collection('notes').findOne({ _id: id });

    res.render('notes/detail', { note });

});


// Form criação de nota
router.get('/', (req, res) => {
    res.render('notes/create');
});

router.post('/', (req, res) => {

    const data = req.body;
    const title = data.title;
    const description = data.description;

    db.getDB()
    .db()
    .collection('notes')
    .insertOne({ title, description })

    res.redirect(301, '..');

});


// View de edição da nota
router.get('/edit/:id', async (req, res) => {

    const id = new ObjectId(req.params.id);

    const note = await db.getDB().db().collection('notes').findOne({ _id: id });

    res.render('notes/edit', { note });
});


// Edição de notas
router.post('/update', (req, res) => {

    const data = req.body;
    const id = new ObjectId(data.id);
    const title = data.title;
    const description = data.description;

    db.getDB()
    .db()
    .collection('notes')
    .updateOne({ _id: id }, { $set: { title, description } });

    res.redirect('/');

});


// Remoção da tarefa
router.post('/delete/', (req, res) => {

    const data = req.body;
    const id = new ObjectId(data.id);

    db.getDB()
    .db()
    .collection('notes')
    .deleteOne({ _id: id });  

    res.redirect(301, '/');

});

module.exports = router;