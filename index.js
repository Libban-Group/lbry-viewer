import  * as dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';

import api from './api.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', async (req,res)=>{
    let text;
    const data = req.query.q ? await api(req.query.q) : {};

    if (data.result && data.result.mime_type && data.result.mime_type.includes('text')) {
        text = await axios(process.env.LBRY_STREAMING_API + data.result.sd_hash);
    }

    res.render('index', {data, text});
})

app.listen(PORT, (err)=>{
    console.log(err||"LBRY Viewer started!");
})