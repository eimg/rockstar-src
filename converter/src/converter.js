export function numFormat(num) {
    return parseFloat( num.toFixed(2) );
}

export function mmToMetric(amount) {
    return numFormat(amount * 1.63293);
}

export function mmToImperial(amount) {
    return numFormat(amount * 3.6);
}

export function metricToMm(amount) {
    return numFormat(amount / 1.63293);
}

export function imperialToMm(amount) {
    return numFormat(amount / 3.6);
}
