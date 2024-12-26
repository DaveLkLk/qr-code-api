const QRCode = require('qrcode')

const generateQR = async (req, res) => {
    try {
        const { text, format = 'svg' } = req.query;
        if (!text) {
            return res.status(400).send('Text parameter is required');
        }

        let qrCode;
        if (format === 'svg') {
            qrCode = await QRCode.toString(text, { type: 'svg' });
            res.type('image/svg+xml')
            res.send(qrCode)
        } else {
            qrCode = await QRCode.toDataURL(text);
        }

        res.type(format === 'svg' ? 'image/svg+xml' : 'application/json');
        res.send(qrCode);
    } catch (error) {
        res.status(500).send('Error generating QR code');
    }
};

const generateQRWithExpiry = async (req, res) => {
    try {
        const { text, expiry, format = 'svg' } = req.query;
        if (!text) {
            return res.status(400).send('Text parameter is required');
        }

        if (!expiry) {
            return res.status(400).send('Expiry parameter is required');
        }

        const expiryDate = new Date(expiry);
        if (isNaN(expiryDate.getTime())) {
            return res.status(400).send('Invalid expiry date');
        }

        const data = {
            text,
            expiry: expiryDate.toISOString(),
        };

        let qrCode;
        if (format === 'svg') {
            qrCode = await QRCode.toString(JSON.stringify(data), { type: 'svg' });
        } else {
            qrCode = await QRCode.toDataURL(JSON.stringify(data));
        }

        res.type(format === 'svg' ? 'image/svg+xml' : 'application/json');
        res.send(qrCode);
    } catch (error) {
        res.status(500).send('Error generating QR code');
    }
};
module.exports = { generateQR, generateQRWithExpiry}