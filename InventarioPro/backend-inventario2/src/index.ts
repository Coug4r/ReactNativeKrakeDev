import express from "express";
import productosRoutes from "./routes/productos.js";
const app = express();
const port = 3001;

app.use(express.json({limit: '10mb'}));
app.use("/productos", productosRoutes)

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto:", port);
});