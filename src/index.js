require('dotenv').config();
const express = require('express');
const app = require('./app.js')
const PORT = process.env.PORT || 3000;
const is_SERVER_IIS = process.env.IISNODE_VERSION;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
