// katthem
const express = require('express');
const cors = require('cors');
const nedb = require('nedb-promise');

// skapa en connection med vår catsdb
const catsDB = new nedb({ filename: 'cats.db', autoload: true });

// initiera appen
const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));

// visa alla katter som finns på katthemmet
app.get('/api/allcats', async (req, res) => {
    const allCats = await catsDB.find({});
    res.json(allCats);
});

// lägga till en ny katt
app.post('/api/addcat', (req, res) => {
    // förvänta oss data från användaren i form av ett objekt
    // req.body = {
    //     name: "Smilla",
    //     age: 3,
    //     img: "",
    //     neutered: false
    // }
    const cat = req.body;
    catsDB.insert(cat);
    res.send('all good');
});

// hitta matchningar
app.post('/api/findmatches', async (req, res) => {
    // sökning sker på vad användaren skickar in för söktyp
    // req.body = {
    //     searchType: 'name' | 'age' | 'neutered',
    //     searchInput: '5 years'
    // }
    const searchType = req.body.searchType;
    const searchValue = req.body.searchValue;
    let searchMatches = [];
    if (searchType == 'name') {
        searchMatches = await catsDB.find({ name: searchValue });
    } else if (searchType == 'age') {
        searchMatches = await catsDB.find({ age: searchValue });
    } else if (searchType == 'neutered') {
        searchMatches = await catsDB.find({ age: searchValue });
    }

    res.json(searchMatches);
});

// ta bort adopterad katt
app.delete('/api/deletecat', (req, res) => {
    // vi förväntar oss ett id från användaren
    const catId = req.body.id;
    catsDB.remove({ _id: catId }, function (err, removed) {
        if (err) {
            console.log(err, 'lite fel blev det här');
        } else {
            console.log(removed);
        }
    });
    res.send('cat gone')
});

app.put('/api/updatecat', (req, res) => {
    // const req,body = {
    //     id: id,
    //     whatToUpdate: name,
    //     updateto: 'Arnold'
    // }
    const { id, whatToUpdate, updateTo } = req.body;
    if (whatToUpdate == 'name') {
        catsDB.update({ _id: id }, { $set: { name: updateTo } });
    } else if (whatToUpdate == 'age') {
        catsDB.update({ _id: id }, { $set: { age: updateTo } });
    } else if (whatToUpdate == 'img') {
        catsDB.update({ _id: id }, { $set: { img: updateTo } });
    }
    res.send('all good')
});

// kicka igång servern
app.listen(8888, () => {
    console.log("it's alive on 8888");
});