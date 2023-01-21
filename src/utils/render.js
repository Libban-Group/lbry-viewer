import ejs from 'ejs';
import util from 'util';

const render = util.promisify(ejs.renderFile);

export default async (view, options={})=> {


    // Give EJS some information
    options.info = {
        time: Date.now(),
        LBRY_API: process.env.LBRY_API,
        LBRY_STREAMING_API: process.env.LBRY_STREAMING_API,
        LBRY_STREAMING_GET: process.env.LBRY_STREAMING_GET,
        LBRY_STATISTICS_LINK: process.env.LBRY_STATISTICS_LINK
    }

    let res;
    try {
        const ren = await render(`./views/${view}/page.ejs`, options);
        res = new Response(ren)
        res.headers.set('Content-Type', 'text/html; charset=utf-8');
    } catch (err) {
        console.log(err);
        res = new Response(err);
    }

    return res;
}