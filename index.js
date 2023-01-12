import  * as dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

import api from './api.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req,res)=>{
    if (req.query.q) {
        console.log(req.query.q);
        const data = await api("get", {uri: req.query.q});
        let text;
        if (data && data.mime_type && data.mime_type.includes('text')) {
            text = await axios(process.env.LBRY_STREAMING_API + data.sd_hash);
        }
        return res.render('index.ejs', {data, text});
    }
    if (req.query.s) {
        const data = await api("claim_search", {text: req.query.s, page: parseInt(req.query.p || '1')});

        // console.log(data);

        return res.render('index.ejs', {data, query: req.query.s});
    }
    return res.render('index.ejs');

    // res.render('index', {data, text});
})


// Maybe for future use

app.post('/api/get', async (req,res)=>{
    console.log(req.body);
    if (!req.body.uri) return res.json({"error": "expected uri"});

    const search = await api("get", req.body);

    res.json(search);
})

app.post('/api/search', async (req,res)=>{
    if (!req.body.text) return res.json({"error": "expected text"});

    const search = await api("claim_search", req.body, true);

    res.json(search);
})

app.listen(PORT, (err)=>{
    console.log(err||"LBRY Viewer started!");
})