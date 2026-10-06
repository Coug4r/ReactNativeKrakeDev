import express from "express";
const app = express();
const port = 3001;

app.use(express.json({limit: '10mb'}));

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto:", port);
});