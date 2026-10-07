import {Router} from "express"
import {obtenerProductos, crearProducto, actualizarProducto, eliminarProducto} from "../controllers/productos/controllersProductos.js"

const route = Router();

route.get("/", obtenerProductos);
route.post("/", crearProducto);
route.put("/:id", actualizarProducto);
route.delete("/:id", eliminarProducto);

export default route;