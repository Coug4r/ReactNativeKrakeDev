import express from "express";
<<<<<<< HEAD
import productosRoutes from "./routes/productos.js";
=======
>>>>>>> 47ef122c326332e3ecb4db9dce9ca9d0b3db1ad4
const app = express();
const port = 3001;

app.use(express.json({limit: '10mb'}));
<<<<<<< HEAD
app.use("/productos", productosRoutes)
=======
>>>>>>> 47ef122c326332e3ecb4db9dce9ca9d0b3db1ad4

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto:", port);
});