import render from './utils/render.js';

export default async (ctx) => {

    // If path is / - its home
    if (ctx.path === '/') return ctx.sendRaw(await render('home'));

    const path = ctx.path.replace('/', '').split('/');
    
    // If path is length one - it is either a claim or channel
    if (path.length === 1) {
        if (path[0][0] === '@') return await channel(ctx);
        return await claim(ctx);
    }

    // If path is length two - probably a channel claim
    if (path.length === 2) {
        if (path[0][0] === '@') return await claim(ctx);
    }
    
    return await notFound(ctx);
}

async function claim(ctx) {
    return ctx.sendRaw(await render('claim'));
}

async function channel(ctx) {
    return ctx.sendRaw(await render('channel'));
}

async function notFound(ctx) {
    return ctx.sendRaw(await render('404'));
}