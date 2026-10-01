import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useProducts } from '../context/PorductoContext';

export default function DetailScreen({route}:any){
  const idToView = route.params?.id;
  const {products} = useProducts();

  const producto = products.find(p =>p.id === idToView);
  if(!producto) return <Text style={styles.notFound}>Producto No Encontrado!</Text>

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.productName}>{producto.name}</Text>
        <Text style={styles.productPrice}>${producto.price.toFixed(2)}</Text>
        <Text style={styles.productDate}>Creado: {producto.createdAt}</Text>
        <Text style={styles.productDescription}>{producto.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5F5F5',
    padding:16,
  },
  card:{
    backgroundColor:'#fff',
    borderRadius:12,
    padding:20,
    elevation:3,
  },
  productName:{
    fontSize:20,
    fontWeight:'bold',
    color:'#333',
    marginBottom:8,
  },
  productPrice:{
    fontSize:18,
    color:'#4CAF50',
    marginBottom:6,
  },
  productDate:{
    fontSize:14,
    color:'#888',
    marginBottom:10,
  },
  productDescription:{
    fontSize:15,
    color:'#555',
    lineHeight:20,
  },
  notFound:{
    flex:1,
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:16,
    color:'#E53935',
  }
});
