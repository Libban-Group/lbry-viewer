import Bao from 'baojs';
import magic from './magic.js';
import pages from './pages.js';

// const app = http();

const app = new Bao();

app.get('/*any', async (ctx)=>{
    if (ctx.path.slice(0, 3) == '/$/') return await magic(ctx);
    return await pages(ctx);
})

app.after((ctx) => {
    // ctx.res.headers.append('Access-Control-Allow-Origin', '*');
    // ctx.res.headers.append("Access-Control-Allow-Origin", "*");
    return ctx;
});

app.listen(process.env.PORT || 3000);
console.log("LBRY Viewer started");