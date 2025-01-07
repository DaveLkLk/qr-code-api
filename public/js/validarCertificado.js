import { AlertModel } from '../libs/alert.js'
import { Loader } from './components/loader.js';
import { TemplateCertificado } from './template/certificado.js';
const form = document.querySelector('form#form-validacion-certificado');
const codigoVerificacion = document.querySelector('input#codigo-verificacion')

document.body.classList.remove('certificado')
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
        else{
            const pdf_blob = await response.blob();
            const pdfURL = URL.createObjectURL(pdf_blob);
            return {status: true, msg: '', src: pdfURL};
        }
    }
    catch (err){
        console.error(err);
        return {status: false, msg: err.message, data: null}
    }
}
async function postDataCertificado(codigo){
    try {
        const response = await fetch('/certificado/validar-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo })
        });
        if(!response.ok) {
            const res = await response.json();
            console.error(res.msg);
            return { status: false, msg: res.msg, src: null }
        }
        const data = await response.json();
        return {status: true, msg: '', data};
    }
    catch (err){
        console.error(err);
        return {status: false, msg: err.message, data: null };
    }
}

async function showFirstPage(pdfSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    const loadingTask = pdfjsLib.getDocument(pdfSrc);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };
    await page.render(renderContext).promise;
    return canvas.toDataURL(); // Devuelve la imagen como base64
}
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const loader = Loader('Obteniendo certificado...');
    document.body.appendChild(loader)
    try {
        const codigoVerifValue = codigoVerificacion.value;
        // console.log(codigoVerifValue);
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
        const imageSRC = await showFirstPage(response.src)
        const datos = await postDataCertificado(codigoVerifValue)
        const fecha = (str)=> new Date(str).toISOString().split('T')[0];
        const anio = new Date().getFullYear().toLocaleString();
        const data = {
            digital: { src: response.src, name: `certificado_${anio}`, img: imageSRC},
            entidad: {evento: datos.data.evento, certificadoFecha: fecha(datos.data.fecha_evento), certificadoLugar: datos.data.lugar, area: datos.data.owner, certificadoFechaDos: fecha(datos.data.fecha_dos)},
            usuario: {nombre: `${datos.data.ap_paterno} ${datos.data.ap_materno} ${datos.data.nombres}`},
        }
        document.body.classList.add('certificado')
        const divCertificado = TemplateCertificado(data)
        document.body.innerHTML = divCertificado.outerHTML;
    } catch (error) {
        console.error(error);
        
    }finally{
        if (document.body.contains(loader)) {
            document.body.removeChild(loader);
        }
    }
})