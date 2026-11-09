require("dotenv").config();
const mongoose = require("mongoose");
const createApp = require("./app");

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;
const app = createApp();

async function iniciar() {
  if (mongoUri) await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`API del Invernadero escuchando en el puerto ${port}`);
  });
}

iniciar().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
