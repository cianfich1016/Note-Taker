const notes = require('express').Router();
const { read, readAppend, writeToFile } = require('../helperFunctions/requireHelpers')
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    read('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:noteId', (req, res) =>{
    const noteID = req.params.noteId;
    read('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const final = json.filter((note) => note.noteId == noteID)
            return final.length > 0
            ? res.json(final) : res.json ("No specific note exists.");
        });
        writeToFile('.db/db.json', final);
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const individualNote = { title, text, noteId: uuidv4(),}; 
      readAppend(individualNote, './db/db.json');
      res.json('Congratulations! Your note has been added!');
    } else {
        res.error ('Note added unsuccessfully.');
    }
});


module.exports = notes;