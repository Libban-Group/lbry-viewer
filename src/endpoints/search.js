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

    const resp = await LBRY('claim_search', params);

    // If LBRY SDK error - just return the error
    if (resp.error) return ctx.sendJson(resp);

    // Check channel block list
    //resp.result.items = checkChannelBlockList(resp.result.items);

    const res = {
        items: resp.result.items,
        page: resp.result.page,
        total_items: resp.result.total_items,
        total_pages: resp.result.total_pages   
    }

    return ctx.sendJson(res);
}

/*function checkChannelBlockList(items) {
    const blocked = Object.keys(items).filter(claim => {
        if (!items[claim].signing_channel) return; // Skip if the claim is not associated with a channel

        console.log(items[claim].signing_channel.claim_id);

        if (channelBlockList.includes(items[claim].signing_channel.claim_id)) return claim;
    });
    blocked.forEach(i=>{
        items.pop(i);
    });
    return items;
}*/

function options(query) {
    // Source: https://lbry.tech/api/sdk#claim_search
    return {
        name: query.name,
        text: query.text ? query.text.replaceAll('+', '\+').replaceAll(' ', '+') : undefined, // A space is interpreted as an OR - A '+' is interpreted as a space
        claim_id: query.claim_id,
        claim_ids: checkJSON(query.claim_ids),
        txid: query.txid,
        nout: query.nout,
        channel: query.channel,
        channel_ids: checkJSON(query.channel_ids),
        not_channel_ids: channelBlockList.concat(checkJSON(query.not_channel_ids)),
        has_channel_signature: checkBoolean(query.has_channel_signature),
        valid_channel_signature: checkBoolean(query.valid_channel_signature),
        invalid_channel_signature: checkBoolean(query.invalid_channel_signature),
        limit_claims_per_channel: checkInt(query.limit_claims_per_channel),
        is_controlling: checkBoolean(query.is_controlling),
        public_key_id: query.public_key_id,
        height: checkInt(query.height),
        timestamp: checkInt(query.timestamp),
        creation_height: checkInt(query.creation_height),
        creation_timestamp: checkInt(query.creation_timestamp),
        activation_height: checkInt(query.activation_height),
        expiration_height: checkInt(query.expiration_height),
        release_time: checkInt(query.release_time),
        amount: checkInt(query.amount),
        support_amount: checkInt(query.support_amount),
        effective_amount: checkInt(query.effective_amount),
        trending_score: checkInt(query.trending_score),
        reposted: checkInt(query.reposted),
        claim_type: query.claim_type,
        stream_types: checkJSON(query.stream_types),
        media_types: checkJSON(query.media_types),
        fee_currency: query.fee_currency,
        fee_amount: checkFloat(query.fee_amount),
        duration: checkInt(query.duration),
        any_tags: checkJSON(query.any_tags),
        all_tags: checkJSON(query.all_tags),
        not_tags: checkJSON(query.not_tags),
        any_languages: checkJSON(query.any_languages),
        all_languages: checkJSON(query.all_languages),
        not_languages: checkJSON(query.not_languages),
        any_locations: checkJSON(query.any_locations),
        all_locations: checkJSON(query.all_locations),
        not_locations: checkJSON(query.not_locations),
        page: checkInt(query.page) || 1,
        page_size: checkInt(query.page_size) || 20,
        order_by: checkJSON(query.order_by) || ["support_amount"],
        no_totals: checkBoolean(query.no_totals),
        wallet_id: query.wallet_id,
        include_purchase_receipt: checkBoolean(query.include_purchase_receipt),
        include_is_my_output: checkBoolean(query.include_is_my_output),
        remove_duplicates: checkBoolean(query.remove_duplicates),
        has_source: checkBoolean(query.has_source),
        sd_hash: query.sd_hash,
        has_no_source: checkBoolean(query.has_no_source),
        // new_sdk_server: query.new_sdk_server // Disabled - not supported
    }
}