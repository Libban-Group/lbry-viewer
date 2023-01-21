import LBRY from '../utils/LBRY.js';
import { checkJSON, checkInt, checkFloat, checkBoolean} from '../utils/checkTypes.js'

export default async (ctx)=>{
    let params = Object.fromEntries(ctx.query);

    // Try parse the query
    try {
        params = options(params);
    } catch {
        return ctx.sendJson({ error: "Failed to parse params" });
    }

    try {
        let resp = await fetch(process.env.LBRY_STREAMING_API + params.stream);
        resp = await resp.text();

        return ctx.sendJson({text: resp});
    } catch (err) {
        console.log(err);
    }

    return ctx.sendJson({error: "LBRY SDK error"});
}

function options(query) {
    // Source: https://lbry.tech/api/sdk#resolve
    return {
        stream: query.stream
    }
}