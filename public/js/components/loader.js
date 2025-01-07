export function Loader(text) {
    let str = !text ? 'Descargando..' : text;
    const container_loader = document.createElement('div');
    container_loader.classList.add('container_loader');
    container_loader.innerHTML = `
        <div class="box_loader">
            <div class="content_loader">${str}</div>
            <div class="loader"></div>
        </div>
        <div class="footer_loader">
            Espere unos segundos
        </div>
    `;
    return container_loader;
}