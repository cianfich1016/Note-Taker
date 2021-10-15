const notes = require('express').Router();
const { read, readAppend, writeToFile } = require('../helperFunctions/requireHelpers')
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    read('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:id', (req, res) =>{
    const noteID = req.params.id;
    read('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const final = json.filter((note) => note.id === noteID)
            return final.length > 0
            ? res.json(final) : res.json ("No specific note exists.");
        });
        
});

notes.delete('/:id', (req, res) => {
    const noteID = req.params.id;
    read('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const final = json.filter((note) => note.id !== noteID);

            writeToFile('./db/db.json', final);

            res.json(`Note ${noteID} has been removed.`);
        });
});

notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = { title, text, id: uuidv4(),}; 
      readAppend(newNote, './db/db.json');
      res.json('Congratulations! Your note has been added!');
    } else {
        res.error ('Note added unsuccessfully.');
    }
});


module.exports = notes;