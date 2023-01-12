import axios from 'axios';

export default async function api (method, params, pages) {
    let data;
    if (pages) params.page_size = 50;
    try {
        const resp = await axios({
            method: "post",
            url: process.env.LBRY_API,
            data: {
                method,
                params
            }
        });

        
        if (resp.data.error) return {error: resp.data.error.message};
        data = resp.data.result;

    } catch(err) {
        console.log(err);
        console.log("Could not talk to the LBRY SDK");
        data = {"message": "error"};
    }
    return await data;
}