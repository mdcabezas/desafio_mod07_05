const express = require("express");
const cors = require("cors");
const app = express();
// Require the routes
const indexRoutes = require('./routes/index');

// Habilitar cors
app.use(cors());
// Procesar json
app.use(express.json())

// Agregar rutas
app.use('/', indexRoutes);

module.exports = app;