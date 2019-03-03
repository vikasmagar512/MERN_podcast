import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import router from './router';
import { dbConfig } from './config';
// Requires request for HTTP requests
const request = require('request');
// Requires fs to write synthesized speech to a file
const fs = require('fs');
const xmlbuilder = require('xmlbuilder');
const result = require('dotenv').config();

if (result.error) {
    throw result.error;
}

console.log(result.parsed);

const app = express();

mongoose.connect(dbConfig.db, { useMongoClient: true })
mongoose.set('debug', true);

app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 3333;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);
