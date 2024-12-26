import { AlertModel } from '../libs/alert.js'
import { TemplateCertificado } from './template/certificado.js';
const form = document.querySelector('form#form-validacion-certificado');
const codigoVerificacion = document.querySelector('input#codigo-verificacion')

const Alert = new AlertModel();
Alert.config({container: document.querySelector('.container_alert')})
async function validarCertificado(codigo){
    try {
        const response = await fetch('/certificado/validar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo })
        });
        if(!response.ok) {
            const res = await response.json();
            console.error(res.msg);
            return {status: false, msg: res.msg, src: null}
        }
        const pdf_blob = await response.blob();
        const pdfURL = URL.createObjectURL(pdf_blob);
        return {status: true, msg: '', src: pdfURL};
    }
    catch (err){
        console.error(err);
        return {status: false, msg: err.message, data: null}
    }
}
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const codigoVerifValue = codigoVerificacion.value;
    console.log(codigoVerifValue);
    if (!codigoVerifValue) {
        alert('Por favor, complete los campos requeridos.')
        return;
    }
    const response = await validarCertificado(codigoVerifValue)
    if(!response.status){
        Alert.description = response.msg;
        Alert.classname = Alert.tipoClase.INFO;
        Alert.temporal = true;
        Alert.showAlert();
        return
    }
    const data = {
        digital: { src: response.src, name: 'certificado_2024'}
    }
    const divCertificado = TemplateCertificado(data)
    document.body.innerHTML = divCertificado.outerHTML;
})