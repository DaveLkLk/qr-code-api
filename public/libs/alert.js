class AlertIcon {
  static ICONS = {
      INFO: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
             <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
           </svg>`,
      SUCCESS: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
              </svg>`,
      ERROR: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
<path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>`,
      CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>`,
      WAITING: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
              </svg>`,
      FATAL: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z"/>
              <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975"/>
            </svg>`,
      WARNING: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
    `
  };
  createIcon(type) {
      if (typeof type !== 'string') throw new Error('@type no válido para devolver SVG');
      let etype = String(type).toUpperCase();
      return AlertIcon.ICONS[etype] || {};
  }
}
class AlertParams {
  constructor(classname) {
      this.classname = classname;
  }
  static CLASSNAMES = Object.freeze({
      INFO: "alert--info",
      ERROR: "alert--error",
      WAIT: "alert--wait",
      SUCCESS: "alert--success",
      FATAL: "alert--fatal",
      WARNING: "alert--warning"
  })
  static TYPES_ICON = Object.freeze({
      INFO: {
          classname: this.CLASSNAMES.INFO,
          value: 'INFORMACIÓN:',
          icon: new AlertIcon().createIcon('INFO')
      },
      ERROR: {
          classname: this.CLASSNAMES.ERROR,
          value: 'ERROR:',
          icon: new AlertIcon().createIcon('ERROR')
      },
      SUCCESS: {
          classname: this.CLASSNAMES.SUCCESS,
          value: 'ÉXITO',
          icon: new AlertIcon().createIcon('success')
      },
      FATAL: {
          classname: this.CLASSNAMES.FATAL,
          value: 'FATAL ERROR:',
          icon: new AlertIcon().createIcon('fatal')
      },
      WAITING: {
          classname: this.CLASSNAMES.WAIT,
          value: 'Cargando:',
          icon: new AlertIcon().createIcon('waiting')
      },
      WARNING: {
          classname: this.CLASSNAMES.WARNING,
          value: 'ADVERTENCIA:',
          icon: new AlertIcon().createIcon('warning')
      }
  })
  getClassname() {
      return AlertParams.CLASSNAMES;
  }
  getAlertIcon() {
      return AlertParams.TYPES_ICON;
  }
  findAlertIcon() {
      const objICONS = Object.values(AlertParams.TYPES_ICON)
      const findIcon = objICONS.find(icon => icon.classname === this.classname)
      if (!findIcon.classname) throw new Error('@classnameAlert no encontrado o indefinida')
      return findIcon
  }
  getIconTypeAlert() {
      if (!this.classname) throw new Error('@classname no definido')
      return this.findAlertIcon();
  }
}
export class AlertModel extends AlertParams {
  #ICON
  constructor(container, title = '', description = '', classname, temporal = false) {
      super(classname)
      this.container = container || null;
      this.classname = classname;
      this.title = title;
      this.description = description;
      this.temporal = temporal;
      this.#ICON = new AlertIcon();
      this.tipoClase = new AlertParams().getClassname();
  }
  config({ container, title, description, classname, temporal, time } = {}) {
      this.container = container || this.container;
      this.title = title ?? this.title;
      this.description = description ?? this.description;
      this.classname = classname ?? this.classname;
      this.temporal = temporal ?? this.temporal;
      this.time = time ?? 3000;
  }
  #templateAlert() {
      const alertElement = this.getIconTypeAlert()
      const Alert = document.createElement('div');
      Alert.classList.add('alert');
      Alert.classList.add(this.classname);
      if (this.temporal) Alert.classList.add('alert-progress');
      Alert.id = this.createIDAlert();
      Alert.innerHTML = `
      <div class="alert-message">
        <span class="alert-icon">${alertElement.icon}</span>
        <p class="alert-response">
          <span class="alert-title">${this.title || alertElement.value}</span>
          <span class="alert-description">${this.description || ''}</span>
        </p>
      </div>
      <div class="alert-close">
        <button class="btn-close" type="button" title="Cerrar">
          ${this.#ICON.createIcon('close')}
        </button>
      </div>
      `;
      return Alert
  }
  createIDAlert() {
      const fecha = Date.now();
      const random = Math.floor(Math.random() * 100);
      const alertID = String(random + fecha);
      return alertID;
  }
  controlAlert() {
      this.container.addEventListener('click', (e) => {
          e.preventDefault();
          const alertParent = e.target.closest('div.alert')
          const isBtnClose = e.target.classList.contains('btn-close')
          if (isBtnClose) {
              const alertID = alertParent && e.target.parentElement.parentElement.id;
              this.closeAlert(alertID);
              console.log("showAlert -> success");
          }
      })
  }
  closeAlert(id) {
      document.getElementById(id)?.classList.add('alert--hidden');
  }
  clearContainer() {
      this.container.innerHTML = '';
  }
  showAlert() {
      if (!(this.container instanceof HTMLDivElement)) throw new Error('@container-alert undefined')
      const Alert = this.#templateAlert()
      this.container.appendChild(Alert);
      this.controlAlert();
      const RemoveAlertDOM = (e) => {
          if (e.animationName === 'closeAlert') {
              Alert.removeEventListener('animationend', RemoveAlertDOM)
              Alert.remove();
          }
      }
      if (this.temporal) {
          setTimeout(() => this.closeAlert(Alert.id), this.time);
      }
      Alert.addEventListener('animationend', RemoveAlertDOM)
  }
}