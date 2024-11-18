class AlertIcon {
    static ICONS = {
      INFO: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
               <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
             </svg>`,
      SUCCESS: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                </svg>`,
      ERROR: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
              </svg>`,
      CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>`,
      WAITING: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                </svg>`
    };
    createIcon(type) {
        if(typeof type !== 'string') throw new Error('@type no válido para devolver SVG');
        let etype = String(type).toUpperCase();
        return AlertIcon.ICONS[etype] || {};
    }
  }

export class AlertParams {
    static MESSAGES = Object.freeze({
        // server message
        ERROR_SERVER: "Error en la respuesta del servidor",
        ERROR_DATA: "Error en el envio de los datos",
        INFO_LIMIT: "Se alcanzó el limite de caracteres",
        INFO_VACIO: "Complete los campos requeridos",
        SUCCESS_DATA: "Datos enviados satisfactoriamente",
        SUCCESS_SERVER: "Nuevo registro guardado",
        WAIT_POST: "Enviando datos al servidor..",
        WAIT_GET: "Esperando respuesta del servidor..",
        // client message
        ALERT: 'Complete todos los campos',
        ERROR: 'Ocurrió un error',
        ERROR_PASTE: 'Error al leer el portapapeles',
        NO_DISPONIBLE: 'Característica no agregada..',
        INVALIDO: 'El resgistro ingresado no es válido',
        DUPLICADO: 'Este registro ya existe!',
        SUCCESS: 'Datos guardados satisfactoriamente!',
        NO_SELECT: 'Seleccione una opción!',
        ESPERANDO: 'Procesando solicitud...',
        IN_PROCESS: 'Módulo en proceso...',
        LOADING: 'Cargando datos...',
        CLAVE_INVALID: 'Contraseña inválida',
        LOGIN: 'Inicio de sesion exitoso',
        CLAVE_VALID: 'Contraseña correcta',
        NO_EXISTE: 'No se encontró ningún registro',
        COPY: 'Texto copiado!',
        COPY_NULL: 'Nada que copiar..',
        CLEAR_NULL: 'Nada que limpiar..',
        FORM_CLEAR: 'Formulario limpiado!',
        PASTE_ACCESS: 'Permita el Acceso al portapapeles',
        LOCK_STYLES: 'Estilos bloqueado',
        UNLOCK_STYLES: 'Estilos desbloqueado',
        PIN_SUCCESS: 'Elemento fijado',
        PIN_ERROR: 'Error al intentar fijar el elemento',
        SEARCH_DINAMYC: 'Búsqueda dinámica activada',
        SEARCH_ANEXO: 'Búsqueda por anexo activado'
    });
    static CLASSNAMES = Object.freeze({
        INFO: "alert--info",
        ERROR: "alert--error",
        WAIT: "alert--wait",
        SUCCESS: "alert--success",
        FATAL: "alert--fatal",
        ACTIVE: "alert--active",
        TEMP: {
          default: "alert--temp-default",
          info: "alert--temp-info",
          error: "alert--temp-error",
          success: "alert--temp-success",
        }
    })
    static TYPES_ICON = Object.freeze({
        INFO: {
            classname: 'alert--info',
            value: 'WARNING',
            icon: new AlertIcon().createIcon('INFO')
        },
        ERROR: {
            classname: 'alert--error',
            value: 'ERROR:',
            icon: new AlertIcon().createIcon('ERROR')
        },
        SUCCESS: {
            classname: 'alert--success',
            value: 'SUCCESS',
            icon: new AlertIcon().createIcon('success')
        },
        FATAL: {
            classname: 'alert--fatal',
            value: 'FATAL ERROR:',
            icon: new AlertIcon().createIcon('fatal')
        },
        TEMP_DEFAULT: {
            classname: 'alert--temp-default',
            value: 'LOADING:',
            icon: new AlertIcon().createIcon('waiting')
        },
        TEMP_INFO: {
            classname: 'alert--temp-info',
            value: 'INFO:',
            icon: new AlertIcon().createIcon('info')
        },
        TEMP_ERROR: {
            classname: 'alert--temp-error',
            value: 'FATAL ERROR:',
            icon: new AlertIcon().createIcon('error')
        },
        TEMP_SUCCESS: {
            classname: 'alert--temp-success',
            value: 'SUCCESS:',
            icon: new AlertIcon().createIcon('success')
        }
    })
    getMessage(){
      return AlertParams.MESSAGES;
    }
    getClassname(){
        return AlertParams.CLASSNAMES;
    }
    getAlertIcon(){
        return AlertParams.TYPES_ICON;
    }
    findAlertIcon(classnameAlert){
        const objICONS = Object.values(AlertParams.TYPES_ICON)
        const findIcon = objICONS.find(icon => icon.classname === classnameAlert)
        if(!findIcon.classname) throw new Error('@classnameAlert no encontrado o indefinida')
        return findIcon
    }
  }
export class AlertController {
    #ALERT_ICON = new AlertParams();
    constructor(classname = '', arrInputs = []){
      this.classname = classname;
      this.arrInputs = arrInputs;
      this.arrClassAlert = [];
      this.divProgress = null;
      this.timeProgress = 3000;
      this.TIME_PROGRESS = null;
    }
    setAllItems(arrAllItems = null){
      if(arrAllItems instanceof Array){
        this.arrInputs = arrAllItems
        return this.arrInputs
      }
      throw new Error('Se esperaba un array de elementos');
    }
    setFormItems(formElement = null){
      if(formElement instanceof HTMLFormElement){
        this.arrInputs = [...formElement.querySelectorAll('select, input, textarea, button')]
        return this.arrInputs
      }
      throw new Error('Parámetro no es instancia de Form');
    }
    getIconTypeAlert(){
      console.log(this.classname);
        if(!this.classname) throw new Error('@classname no definido')
        const objAlert = this.#ALERT_ICON.findAlertIcon(this.classname);
        return objAlert;
    }
    inputsEnabled(enabled = true) {
      this.arrInputs.forEach(item =>{
          item.disabled = !enabled
          item.style.cursor = enabled ? 'pointer' : 'not-allowed'
      })
    }
    removeContentForm(){
      this.arrInputs.forEach(item => {
          if(item instanceof HTMLButtonElement) return
          if(item instanceof HTMLInputElement){ item.value = '' }
          else{ return item.textContent = '' }
      });
    }
    removeClassTemp(){
      this.arrClassAlert = this.arrClassAlert.filter(clase => !clase.startsWith('alert--temp'));
    }
    progressTime(){
      let maxProgress = 550
      let startTime = null
      let duration = this.timeProgress
      this.divProgress.style.width = '0px'

      const animateProgress = (currentTime)=>{
        if(!startTime) startTime = currentTime
        const laspeTime = currentTime - startTime
        const progress = Math.min((laspeTime / duration) * maxProgress, maxProgress)
        this.divProgress.style.width = `${progress}px`
        if(laspeTime < duration){
            this.TIME_PROGRESS = requestAnimationFrame(animateProgress)
        }
      }
      this.TIME_PROGRESS = requestAnimationFrame(animateProgress)
    }
    clearProgressTime(){
      if(this.TIME_PROGRESS){
        cancelAnimationFrame(this.TIME_PROGRESS)
        this.TIME_PROGRESS = null
        this.divProgress.style.width = '0px'
      }
    }
  }
export class AlertModel extends AlertController {
    #timeOutID;
    #timeOutIDTwo;
    #ICON;
    #PARAMS;
    constructor(alert, title = '', description='', classname, items = [], time = 3000){
        super(classname, items)
        this.classname = classname;
        this.items = items;
        this.alert = alert;
        this.title = title;
        this.description = description;
        this.#ICON = new AlertIcon();
        this.#PARAMS = new AlertParams();
        this.timeTemp = time;
        this.#timeOutID = null;
        this.#timeOutIDTwo = null;
    }
    config({alert, title, description, classname, items, time} = {}){
        this.alert = alert ?? this.alert;
        this.title = title ?? this.title;
        this.description = description ?? this.description;
        this.classname = classname ?? this.classname;
        this.items = items ?? this.items;
        this.timeTemp = time ?? this.timeTemp;
        this.arrInputs = this.items
        return this.timeTemp;
    }
    #templateAlert(){
        this.alert.innerHTML = `
          <div class="alert-message">
            <span class="alert-icon"></span>
            <p class="alert-response">
              <span class="alert-title"></span>
              <span class="alert-description"></span>
            </p>
          </div>
          <div class="alert-close">
            <button class="btn-close" type="button" title="Cerrar">
              ${this.#ICON.createIcon('close')}
            </button>
          </div>
          <div class="alert-progress"></div>
        `;
        const objTemplate = {
            container: this.alert,
            span_icon: this.alert.querySelector('.alert-message .alert-icon'),
            alert_title: this.alert.querySelector('.alert-response .alert-title'),
            alert_description: this.alert.querySelector('.alert-response .alert-description'),
            btn_close: this.alert.querySelector('.alert-close .btn-close'),
            progress: this.alert.querySelector('.alert .alert-progress')
        }
        return objTemplate
    }
    #alertHandler(){
      this.inputsEnabled(true)
      const classnameAlert = this.#PARAMS.getClassname()
      this.alert.classList.remove(classnameAlert.ACTIVE)
      // LIMPIAR LOS SETTIMEOUT
      if(this.#timeOutID) {
        clearTimeout(this.timeOutID)
      }
      if(this.#timeOutIDTwo) {
        clearTimeout(this.timeOutIDTwo)
      }
      setTimeout(()=>{
        this.alert.classList.remove(this.classname)
      }, 350);
      this.clearProgressTime()
      console.log("showAlert -> success");
    }
    showAlert(){
        if(!(this.alert instanceof HTMLDivElement)) throw new Error('@alert undefined')
        
        this.inputsEnabled(false);
        const alertMsgExist = document.querySelector('.alert-message')
        const alertCloseExist = document.querySelector('.alert-close')

        if(alertMsgExist && alertCloseExist) this.alert.innerHTML = '';
        const classnameAlert = this.#PARAMS.getClassname(); // guardar en memoria las clases para reutilizarlo
        this.alert.classList.add(classnameAlert.ACTIVE)

        this.arrClassAlert = Array.from(this.alert.classList)
        this.removeClassTemp()
        this.alert.classList.add(this.classname)
        
        const alertElement = this.getIconTypeAlert()
        const template = this.#templateAlert()
        // si el título está vacío
        template.alert_title.textContent = this.title || alertElement.value;
        // si la descripción está vacío
        template.alert_description.textContent = this.description || '';
        // establece el icono de alerta
        template.span_icon.innerHTML = alertElement.icon;
        // extrae el boton para cerrar la alerta
        const btnClose = template.btn_close
        // CONTROLAR EL TIMEOUT DE LAS ALERTAS
        const arrcClassTemp = Object.values(classnameAlert.TEMP);// traer las clases temporales
        const existClassTemp = arrcClassTemp.includes(this.classname); // comprobar si existe una clase temporal
        if(existClassTemp){
            this.divProgress = template.progress // preparar el HTML:progress
            this.timeProgress = this.timeTemp // preparar el tiempo para la alerta temporal a la clase
            this.progressTime() //ejecutar el progreso de la alaerta si la clase es temporal
            this.inputsEnabled(true); // habilitar elementos del formulario
            const removeAlertClass = ()=> this.alert.classList.remove(this.classname);//quita la clase dinámica asignada
            this.#timeOutID = setTimeout(() => {
                this.alert.classList.remove(classnameAlert.ACTIVE);//quitar la clase active
                this.#timeOutIDTwo = setTimeout(removeAlertClass, this.timeTemp + 300);
            }, this.timeTemp)
        }
        btnClose.addEventListener('click', ()=>this.#alertHandler())
    }
}