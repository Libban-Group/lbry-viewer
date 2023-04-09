import LBRY from '../utils/LBRY.js';
import { checkJSON, checkInt, checkFloat, checkBoolean} from '../utils/checkTypes.js';

const channelBlockList = JSON.parse(process.env.BLOCKED_CHANNELS || "[]");

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

    resp.result = checkChannelBlockList(resp.result);

    return ctx.sendJson(resp.result);
}

function checkChannelBlockList(res) {
    if (channelBlockList.includes(res.channel_claim_id)) {
        res = {};
        res.notice = "This claim has been blocked as it violates our ToS (Terms of Service).";
        res.notice_link = "/$/tos";
    }
    return res;
}

function options(query) {
    // Source: https://lbry.tech/api/sdk#resolve
    return {
        uri: query.uri
    }
}