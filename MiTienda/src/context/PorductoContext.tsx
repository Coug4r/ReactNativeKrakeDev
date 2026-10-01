import React, {createContext, useState, useContext, ReactNode} from 'react'

export type Product = {
    id: string
    name: string
    description: string
    price: number
    createdAt: string
}

type ProductContextType = {
    products: Product[]
    addProduct: (product: Omit<Product, 'id' | 'createdAt'>)=> void;
    updateProduct: (id:string, product: Omit<Product, 'id'|'createdAt'>)=>void
    deleteProduct:(id:string)=>void
}

const ProductContext = createContext<ProductContextType|undefined>(undefined);

export function ProductProvider({children}:{children:ReactNode}){
    const [products, setProducts] = useState<Product[]>([
        {id: '1', name: 'Zapatos', description:'Talla 41', price: 120, createdAt: new Date().toLocaleDateString()},
        {id: '2', name: 'Camisa', description:'Talla XL', price: 20, createdAt: new Date().toLocaleDateString()},
    ]);

    const addProduct = (product: Omit<Product, 'id' | 'createdAt'>)=>{
        const newProducto = {
            ...product,
            id: Date.now().toString(),
            createdAt: new Date().toLocaleDateString()
        };

        setProducts([...products, newProducto])
    }

    const updateProduct = (id:string, updateProduct: Omit<Product, 'id' | 'createdAt'>)=>{
        setProducts(products.map(p => p.id === id ? {...p, ...updateProduct}:p))
    }

    const deleteProduct = (id:string)=>{
        setProducts(products.filter(p=> p.id !== id))
    }

    return(
        <ProductContext.Provider value={{products, addProduct, updateProduct,deleteProduct}}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts(){
    const context = useContext(ProductContext);
    if(!context) throw new Error('useProducts debe ser usado dentro de un ProductProvaider');
    return context;
    
}