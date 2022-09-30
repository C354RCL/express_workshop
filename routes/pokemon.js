const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
});

//Ruta pokemon/1243
pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const idLength = await db.query('SELECT count(pok_id) FROM pokemon');
    const id = req.params.id;
    const pk = await db.query(`SELECT * FROM pokemon WHERE pok_id = ${id}`);

    console.log(idLength);

    if (id >= 1 && id <= 722) {
        return res.status(200).json(pk)
    } else {
        return res.status(404).send("Pokemon no encontrado");
    }
});

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {

    // Operacion ternario
    // condicion ? valor si verdadero : valor si falso

    const name = req.params.name;
    name.toLowerCase();
    const pkmn = await db.query(`SELECT * FROM pokemon WHERE pok_name = "${name}"`);
    if (pkmn.length > 0) {
        return res.status(200).send(pkmn);
    }
        return res.status(400).send('Pokemon no encontrado');
});

module.exports = pokemon;