#!/use/bin/env node

import {roll} from "./lib/roll.js"
import express from 'express';
import minimist from "minimist";


const app = express()
app.use(express.urlencoded({extended: true}));

const args = minimist(process.argv.slice(2))
const port = args.port || 5000;


app.get('/app/', (req, res) => {
    res.status(200).send("200 OK");
})


app.get('/app/roll/', (req, res, next) => {
    let sides = 6;
    let dice = 2;
    let rolls = 1;
    res.status(200).send(roll(sides, dice, rolls));
})

app.post('/app/roll/', (req, res, next) => {
    let sides = 6;
    let dice = 2;
    let rolls = 1;

    if (req.body.sides) {
        sides = parseInt(req.body.sides);
    }
    if (req.body.dice) {
        dice = parseInt(req.body.dice);
    }
    if (req.body.rolls) {
        rolls = parseInt(req.body.rolls);
    }
    res.status(200).send(roll(sides, dice, rolls));
})


app.get('/app/roll/:sides/', (req, res, next) => {
    let sides = 6;

    if (req.params.sides) {
        sides = parseInt(req.params.sides);
    }
    res.status(200).send(roll(sides, 2, 1));
})


app.get('/app/roll/:sides/:dice/', (req, res, next) => {
    let sides = 6;
    let dice = 2;

    if (req.params.sides) {
        sides = parseInt(req.params.sides);
    }
    if (req.params.dice) {
        dice = parseInt(req.params.dice);
    }
    res.status(200).send(roll(sides, dice, 1));
})


app.get('/app/roll/:sides/:dice/:rolls/', (req, res, next) => {
    let sides = 6;
    let dice = 2;
    let rolls = 1;

    if (req.params.sides) {
        sides = parseInt(req.params.sides);
    }
    if (req.params.dice) {
        dice = parseInt(req.params.dice);
    }
    if (req.params.rolls) {
        rolls = parseInt(req.params.rolls);
    }
    res.status(200).send(roll(sides, dice, rolls));
})

app.get('*', (req, res) => {
    res.status(404).send("404 NOT FOUND");
})

app.listen(port);