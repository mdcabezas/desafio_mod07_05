const app = require("./app.js");
// Asigna puerto servidor WEB
const PORT = process.env.PORT || 3000

// Inicia Servidor
app.listen(PORT, console.log(`Server on port: ${PORT}`))