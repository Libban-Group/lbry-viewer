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

    const resp = await LBRY('resolve', params);

    // If LBRY SDK error - just return the error
    if (resp.error) return ctx.sendJson(resp);

    //console.log(resp.result);

    // Check channel block list
    resp.result = checkChannelBlockList(resp.result);

    const res = {
        claims: Object.values(resp.result), 
    }


    return ctx.sendJson(res);
}

function checkChannelBlockList(res) {
    const blocked = Object.keys(res).filter(claim => channelBlockList.includes(res[claim].claim_id));
    blocked.forEach(claim=>{
        res[claim].notice = "This channel has been blocked as it violates our ToS (Terms of Service).";
        res[claim].notice_link = "/$/tos"
    });
    return res;
}

function options(query) {
    // Source: https://lbry.tech/api/sdk#resolve
    return {
        urls: checkJSON(query.urls),
        wallet_id: query.wallet_id,
        // new_sdk_server: query.new_sdk_server, // Disabled - not supported
        include_purchase_receipt: checkBoolean(query.include_purchase_receipt),
        include_is_my_output: checkBoolean(query.include_is_my_output),
        include_sent_supports: checkBoolean(query.include_sent_supports),
        include_sent_tips: checkBoolean(query.include_sent_tips),
        include_received_tips: checkBoolean(query.include_received_tips)
    }
}