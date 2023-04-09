import serveStatic from 'serve-static-bun';
import render from './utils/render.js';
import api from './api.js';

const pages = [
    "search",
    "tos"
]

export default async (ctx)=>{
    // Use public directory
    if (ctx.path.slice(0,10) === '/$/public/') return await serveStatic("public", { middlewareMode: "bao", stripFromPathname: "/$/public" })(ctx);

    
    // Mount API
    if (ctx.path.slice(0,7) === '/$/api/') return await api(ctx);

    // Mount all $ pages
    const page = ctx.path.slice(3);
    if (pages.includes(page)) return ctx.sendRaw(await render(page));

    // If we didn't find it - it doesn't exist
    return ctx.sendRaw(await render('404'));



}