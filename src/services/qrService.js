import QRCode from 'qrcode'

export const createQRCode = async (text)=> {
    return await QRCode.toDataURL(text)
};
export const createQRCodeWithLimit = async(text, limit)=> {
    const data = {
        text,
        limit: limit.toISOString(),
    };
    return await QRCode.toDataURL(JSON.stringify(data));
}