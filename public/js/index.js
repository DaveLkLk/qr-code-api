document.getElementById('qrForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const text = document.getElementById('text').value;
    const expiry = document.getElementById('expiry').value;
    const format = document.getElementById('format').value;
    console.log(format);

    let url = `/api/qr/generate?text=${encodeURIComponent(text)}&format=${format}`;
    if (expiry) {
        url += `&expiry=${encodeURIComponent(expiry)}`;
    }
    try {
        const response = await fetch(url);
        const qrCode = await response.text();
        const qrImage = document.getElementById('qrImage');
        qrImage.src = format === 'svg' ? `data:image/svg+xml;base64,${btoa(qrCode)}` : qrCode;
    
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.style.display = 'block';
        downloadBtn.href = format === 'svg' ? `data:image/svg+xml;base64,${btoa(qrCode)}` : qrCode;
        downloadBtn.download = `qrcode.${format}`;
        
    } catch (error) {
        console.log(error);
    }
});