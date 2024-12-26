import { AlertModel, AlertParams } from "../libs/alert.js";

const divAlert = document.querySelector("div.alert");
const username = document.getElementById('username');
const password = document.getElementById('password');
const btnLogin = document.getElementById('btn-login');
const formLogin = document.getElementById('form-login');

const TYPE_ALERT = new AlertParams().getClassname();
const Alert = new AlertModel();
Alert.config({
    alert: divAlert,
    items: [username, password, btnLogin]
});

async function LoginSystem(userData){
    try {
        console.log(userData);
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if(!response.ok){
            throw new Error('Hubo problemas en el servidor')
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message)
    }
}
formLogin.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const userValue = username.value;
    const passValue = password.value;
    if(!userValue || !passValue){
        Alert.title = 'INFO'
        Alert.description = 'Complete el formulario!'
        Alert.classname = TYPE_ALERT.TEMP.info
        Alert.showAlert();
        return
    }
    const dataServer = await LoginSystem({username: userValue, password: passValue})
    if(dataServer && dataServer.status === 'error'){
        Alert.title = 'ERROR'
        Alert.description = dataServer.message
        Alert.classname = TYPE_ALERT.TEMP.error
        Alert.showAlert();
        return
    }
    if(dataServer && dataServer.status === 'validation'){
        Alert.title = 'VALIDACIÓN'
        Alert.description = dataServer.message
        Alert.classname = TYPE_ALERT.INFO
        Alert.showAlert();
        return
    }
    if(dataServer && dataServer.status === 'success'){
        window.location.href = '/dashboard'
        return;
    }
})
