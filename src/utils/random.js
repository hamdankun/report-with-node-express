/**
 * Random byte
 */
randomByte = function () {
    return Math.round(Math.random() * 256);
}

/**
 * Random IP address
 */
exports.randomIp = function() {
    var ip = randomByte() + '.' +
        randomByte() + '.' +
        randomByte() + '.' +
        randomByte();
    return ip;
}

/**
 * Random string
 */
exports.randomString = function() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}