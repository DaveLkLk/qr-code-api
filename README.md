## API QR CERTIFICADO

- Instalar dependencias
```javascript
npm install
```

- Ejecutar el proyecto en local
```javascript
npm run dev
```


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
