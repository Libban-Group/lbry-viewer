import loadJSON from "./loadJSON.js";

const channelBlockList = loadJSON('/data/blockedChannels.json') || [];
const claimBlockList = loadJSON('/data/blockedClaims.json') || [];

export default function(claims, action) {
    if (action === "notice") return notice(claims);
    if (action === "remove") return remove(claims);
    return claims;
}

function notice(claims) {
    const blocked = Object.keys(claims).filter(claim => {
        if (channelBlockList.includes(claims[claim].claim_id)) return true; // Is claim_id in channelBlockList?

        if (channelBlockList.includes(claims[claim].channel_claim_id)) return true; // Is the author on the block list? 
    });

    blocked.forEach(claim=>{
        claims[claim].value.thumbnail = undefined;
        claims[claim].value.cover = undefined;
        claims[claim].notice = "This channel has been blocked as it violates our ToS (Terms of Service).";
        claims[claim].notice_link = "/$/tos"
    });
    
    return claims;
}

function remove(claim) {
    if (claimBlockList.includes(claim.claim_id) || channelBlockList.includes(claim.channel_claim_id)) { // Is claim_id in the claimBlockList?
        claim = {
            notice: "This claim has been blocked as it violates our ToS (Terms of Service).",
            notice_link: "/$/tos"
        };
    }
    return claim;
}