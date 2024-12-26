const { toDataURL} = require('qrcode')

const createQRCode = async (text)=> {
    return await toDataURL(text)
};
const createQRCodeWithLimit = async(text, limit)=> {
    const data = {
        text,
        limit: limit.toISOString(),
    };
    return await toDataURL(JSON.stringify(data));
}
module.exports = {
    createQRCode,
    createQRCodeWithLimit,
}