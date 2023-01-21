(obj)=>{
    let query = "";
    for (let key in obj) {
        if (query != "") {
            query += "&";
        }
        query += (key + "=" + encodeURIComponent(JSON.stringify(obj[key])));
    }
    return query;
}