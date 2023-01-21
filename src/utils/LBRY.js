export default async (method, params)=> {
    let resp = {};
    try {
        const data = await fetch(process.env.LBRY_API || "http://localhost:5279/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                method,
                params
            })
        });

        resp = await data.json();
    } catch (err) {
        console.log(err);
        resp.error = "Failed to talk to SDK";
    }
    return resp;
}