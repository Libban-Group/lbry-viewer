(key)=>{
    // Get LocalStorage Key
    let value = localStorage.getItem(key);

    if (!value) return;

    try {
        value = JSON.parse(value);
    } catch {
        console.log("Failed to parse value for '" + key + "'");
        return;
    }

    return value;
}