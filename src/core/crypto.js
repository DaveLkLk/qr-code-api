const crypto = require('crypto');

const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || 'sin_clave_secreta_de_32_letras';
const ALGORITMO = process.env.CRYPTO_ALGORITMO || 'aes-256-ctr';

function encryptData(data){
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITMO, SECRET_KEY, iv);
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);
    return iv.toString('hex')+':'+encrypted.toString('hex');
}

function decryptData(encryptedData){
    const [iv, content] = encryptedData.split(':');
    const decipher = crypto.createDecipheriv(ALGORITMO, SECRET_KEY, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return JSON.parse(decrypted.toString());
}
const data = encryptData('hola-mundo-2024')