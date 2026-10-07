import { type Request, type Response } from "express";
import prisma from "../../database/prisma.js";

// GET
export const obtenerProductos = async (req: Request, res: Response)=>{
    try {
        const productos = await prisma.producto.findMany();
        res.json(productos);
    } catch (error) {
        res.status(500).json({error: "Error al obtener productos!"+error});
    }   
};

// POST
export const crearProducto = async (req: Request, res: Response)=>{
    const {nombre, precio, categoria, fotoBase64, createdAt, codigoBarras} = req.body;
    
    try {
        const nuevoProducto = await prisma.producto.create({
            data: {
                nombre,
                precio: precio !== undefined ? Number(precio) : undefined as any,
                categoria,
                fotoBase64,
                ...(createdAt ? { createdAt: new Date(createdAt) } : {}),
                codigoBarras
            }
        });
        res.status(201).json(nuevoProducto);

    } catch (error) {
        res.status(500).json({error: "No se pudo crear el producto!"+error});
    }
};

//PUT
export const actualizarProducto = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const {nombre, precio, categoria, fotoBase64, createdAt} = req.body;
    const idNum = Number(id);

    if (isNaN(idNum)) {
        res.status(400).json({error: "ID inválido"});
        return;
    }

    try {
        const productoActualizado = await prisma.producto.update({
            where: {id: idNum},
            data: {
                ...(nombre !== undefined && { nombre }),
                ...(precio !== undefined && { precio: Number(precio) }),
                ...(categoria !== undefined && { categoria }),
                ...(fotoBase64 !== undefined && { fotoBase64 }),
                ...(createdAt !== undefined && { createdAt: new Date(createdAt) })
            }
        });
        res.json(productoActualizado);
    } catch (error) {
        res.status(500).json({error: "Error al editar producto!"});
    }
};

//DELETE
export const eliminarProducto = async (req: Request, res: Response)=>{
    const {id} = req.params;
    const idNum = Number(id);

    if (isNaN(idNum)) {
        res.status(400).json({error: "ID inválido"});
        return;
    }

    try {
        const productoEliminado = await prisma.producto.delete({
            where: {id: idNum}
        });
        res.json({mensaje: "Producto eliminado correctamente!"});
    } catch (error) {
        res.status(500).json({error: "Error al eliminar el producto!"});
    }
};