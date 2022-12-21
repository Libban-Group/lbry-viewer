import axios from 'axios';

export default async (uri)=>{
    let data;
    try {
        const resp = await axios({
            method: "post",
            url: process.env.LBRY_API,
            data: {
                method: "get",
                params: {
                    uri
                }
            }
        });
        data = resp.data;
    } catch(err) {
        console.log("Could not talk to the LBRY SDK");
        data = {"message": "error"};
    }
    return await data;
}