## API QR CERTIFICADO

- Instalar dependencias
```javascript
npm install
```

- Ejecutar el proyecto en local
```javascript
npm run dev
```
- Crear el archivo de configuración:  **.env** en la raíz del proyecto
```javacript
touch .env
```
o crearlo desde la interfaz del editor de código en uso.

- Establecer las siguientes variables de entorno:

```powershell
DB_SERVER=SRVDESARROLLO
DB_USER=
DB_PASSWORD=
DB_DATABASE=BD_Untels2
CRYPTO_SECRET_KEY=
CRYPTO_ALGORITMO=aes-256-ctr
TOKEN_JWT=2024-nov-untels-otic-codigo-qr
TOKEN_DURATION=1h
DB_NAME_SEG=BDSeguridad
```

### 

#### Generar plantilla excel a partir de un excel base

```http
  GET /api/xlsx/generar
```

#### Leer excel y guardar en BD

```http
  GET /api/xlsx/read
```



#### Validar Código de Verificación

```POST
  POST /certificado/validar
```

| Parameter | Type     | Description                       |
| -------- | ------- | --------------- |
| codigo   | string | codigo de verificación |

#### Obtener Detalle de persona Certificado

```http
  POST /certificado/validar-data
```

| Parameter | Type     | Description      |
| -------- | ------- | --------------- |
| codigo   | string | codigo de verificación |


#### Generar QR / No disponible en fase 1

```http
  GET /api/qr/generate?text=${text}&format=${format}`
```
| Parameter | Type   | Description   |
| -------- | ------- | --------------- |
| text   | string | texto a generar QR |
| format   | string | svg - png |
