import search from './endpoints/search.js';
import resolve from './endpoints/resolve.js';
import get from './endpoints/get.js';
import fetch from './endpoints/fetch.js';

const endpoints = {
    "search": {
        method: "get",
        callback: search
    },
    "resolve": {
        method: "get",
        callback: resolve
    },
    "get": {
        method: "get",
        callback: get
    },
    "fetch": {
        method: "get",
        callback: fetch
    }
}

export default async (ctx)=>{
    const endpoint = ctx.path.slice(7);
    if (endpoints[endpoint]) return await endpoints[endpoint].callback(ctx);

    return ctx.sendJson({error: "endpoint not found"});

    // for (let i in endpoints) {
    //     app[endpoints[i].method](`/$/api/${i}`, endpoints[i].callback);
    // }
}