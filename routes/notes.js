const notes = require('express').Router();
const { read, readAppend } = require('../helperFunctions/requireHelpers')

notes.get('/', (req, res) => {
    read('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const individualNote = { title, text}; 
      readAppend(individualNote, './db/db.json');
      res.json('Congratulations! Your note has been added!');
    } else {
        res.error ('Note added unsuccessfully.');
    }
});


module.exports = notes;