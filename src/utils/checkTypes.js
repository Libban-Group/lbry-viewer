export function checkJSON(json) {
    if (json) return JSON.parse(json);
    return undefined;
}

export function checkInt(int) {
    if (int) return parseInt(int);
}

export function checkFloat(float) {
    if (float) return parseFloat(float);
}

export function checkBoolean(value) {
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else value = undefined;
    return value;
}