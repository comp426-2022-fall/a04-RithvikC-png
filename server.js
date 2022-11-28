#!/usr/bin/env node

import minimist from "minimist";
import express from "express";
import { roll } from "./lib/roll.js";

const app = express();

const argument = minimist(process.argv.slice(2));

const port = (() => {
    if (argument.port != null) {
        return argument.port;
    }
    else {
        return 5000;
    }
})();

app.listen(port, () => {
    console.log("Server listening on port " + port);
})


app.get('/app/', (req, res, next) => {
    res.status(200).send('200 OK');
});

app.use(express.urlencoded({extended: true}));

app.get('/app/roll/', (req, res, next) => {
    // Default roll = 6 sides, 2 die, and 1 roll
    res.status(200).send(JSON.stringify(roll(6, 2, 1)));
});

app.post('/app/roll/', (req, res, next) => {
    res.status(200).send(JSON.stringify(roll(parseInt(req.body.sides), parseInt(req.body.dice), parseInt(req.body.rolls))));
});

app.get('/app/roll/:sides/', (req, res, next) => {
    res.status(200).send(JSON.stringify(roll(parseInt(req.params.sides), 2, 1)));
});

app.get('/app/roll/:sides/:dice/', (req, res, next) => {
    res.status(200).send(JSON.stringify(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1)));
});

app.get('/app/roll/:sides/:dice/:rolls/', (req, res, next) => {
    res.status(200).send(JSON.stringify(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls))));
});


app.get('*', (req, res, next) => {
    res.status(404).send('404 NOT FOUND');
});