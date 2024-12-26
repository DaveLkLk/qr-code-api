function CertificadoTitle(isRender){
    const div = document.createElement('div');
    if(!isRender) return null;
    div.classList.add('certificado_title')
    div.innerHTML = `
        <div class="certificado_title-logo">
            <picture>
                <img src="./assets/escudo-untels.png" alt="logo-untels" style="width:100px;height: 100px;">
            </picture>
        </div>
    `;
    return div;
}
function CertificadoEntidad(isRender, entidad){
    const div = document.createElement('div');
    if(!isRender) return null;
    if(!entidad) return console.error('ERROR, no se pudo generar la plantilla de certificado');
    div.classList.add('certificado_entidad');
    div.innerHTML = `
        <div class="certificado_entidad-nombre">
            <span>Universidad Nacional Tecnológica de Lima Sur</span>
        </div>
        <div class="certificado_entidad-descripcion">
            <span>Validación de Certificados Digitales - Evento Universitario</span>
        </div>
        <div class="certificado_entidad-evento">
            <span>${entidad.evento}</span>
        </div>
        <div class="certificado_entidad-lugar-fecha">
            <div class="certificado_fecha">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                </span>
                <span>${entidad.certificadoFecha}</span>
            </div>
            <div class="certificado_lugar">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                    </svg>
                </span>
                <span>${entidad.certificadoLugar}</span>
            </div>
        </div>
        <div class="certificado_entidad-escuela">
            <span>Organizado por: </span><span>${entidad.area}</span>
        </div>
    `;
    return div;
}
function CertificadoUsuario(isRender, usuario){
    const div = document.createElement('div');
    if(!isRender) return null;
    div.classList.add('certificado_usuario');
    div.innerHTML = `
        <div class="certificado_usuario-prev">
            <span>Certificado otorgado a</span>
        </div>
        <div class="certificado_usuario-nombre">
            <span>${usuario.nombre}</span>
        </div>
    `;
    return div;
}
function CertificadoInfo(isRender, info){
    const div = document.createElement('div');
    if(!isRender) return null;
    div.classList.add('certificado_info');
    div.innerHTML = `
        <div class="certificado_info-descripcion">
            <span>Información de Certificado</span>
        </div>
        <ul class="certificado_info-lista">
            <li>
                <span>ID del Certificado: </span>
                <span>${info.codigo}</span>
            </li>
            <li>
                <span>Fecha de Emisión: </span>
                <span>${info.fechaEmision}</span>
            </li>
        </ul>
    `;
    return div;
}
function CertificadoObs(isRender, obs){
    const div = document.createElement('div');
    if(!isRender) return null;
    div.classList.add('certificado_obs');
    div.innerHTML = `
        <div class="certificado_obs-nombre">
            <span>Observaciones</span>
        </div>
        <div class="certificado_obs-descripcion">
            <span>${obs.descripcion}.</span>
        </div>
    `;
    return div;
}
function CertificadoDigital(isRender, digital){
    const div = document.createElement('div');
    if(!isRender) return null;
    div.classList.add('certificado_digital');
    div.innerHTML = `
        <div class="certificado_digital-pdf">
            <embed id="certificado-usuario-pdf" src="${digital.src}" type="application/pdf" width="100%" height="300px">
        </div>
        <div class="certificado_download">
            <a href="${digital.src}" download="${digital.name}" rel>Descargar Certificado</a>
        </div>
    `;
    return div;
}
export function TemplateCertificado(data){
    if(!data) return console.error('ERROR, no se pudo generar la plantilla de certificado');
    const div = document.createElement('div');
    div.classList.add('container_certificado');
    div.innerHTML = '';
    // div.appendChild(CertificadoTitle(true));
    // div.appendChild(CertificadoEntidad(true, data.entidad));
    // div.appendChild(CertificadoUsuario(true, data.usuario));
    // div.appendChild(CertificadoInfo(true, data.info));
    // div.appendChild(CertificadoObs(true, data.obs));
    div.appendChild(CertificadoDigital(true, data.digital));
    return div;
}
