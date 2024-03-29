import LBRY from '../utils/LBRY.js';
import checkBlockList from '../utils/checkBlockList.js';
import { checkJSON, checkInt, checkFloat, checkBoolean} from '../utils/checkTypes.js';

export default async (ctx)=>{
    let params = Object.fromEntries(ctx.query);

    // Try parse the query
    try {
        params = options(params);
    } catch {
        return ctx.sendJson({ error: "Failed to parse params" });
    }

    const resp = await LBRY('get', params);

    // If LBRY SDK error - just return the error
    if (resp.error) return ctx.sendJson(resp);

    // Remove blocked content and just return notice
    resp.result = checkBlockList(resp.result, "remove");

    return ctx.sendJson(resp.result);
}

function options(query) {
    // Source: https://lbry.tech/api/sdk#resolve
    return {
        uri: query.uri
    }
}