import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useProducts } from "../context/ProductContext";
import { Ionicons } from "@expo/vector-icons";

export default function ProductScreen({navigation}: any){
  const {products, deleteProduct} = useProducts();

  return(
    <View style={styles.container}>
      <Text style={styles.header}>Catálogo de Productos</Text>

      <FlatList
        data={products}
        keyExtractor={(item)=>item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({item})=>(
          <View style={styles.card}>
            {item.fotoBase64 ? (
              <Image
                source={{uri: `data:image/jpeg;base64, ${item.fotoBase64}`}}
                style={styles.image}
              />
            ) : (
              <Ionicons name="image-outline" size={60} color="#ccc" style={styles.image} />
            )}

            <View style={styles.info}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.price}>${item.precio.toFixed(2)}</Text>
              <Text style={styles.category}>{item.categoria}</Text>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={()=> deleteProduct(item.id)}>
              <Ionicons name="trash-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f9f9f9',   // ✅ fondo claro
    padding:16
  },
  header:{
    fontSize:22,
    fontWeight:'bold',
    color:'#222',
    marginBottom:20,
    textAlign:'center'
  },
  listContainer:{
    paddingBottom:20
  },
  card:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',       // ✅ tarjetas blancas
    padding:14,
    borderRadius:10,
    marginBottom:12,
    shadowColor:'#000',
    shadowOpacity:0.05,
    shadowRadius:4,
    elevation:2
  },
  image:{
    width:70,
    height:70,
    borderRadius:8,
    marginRight:12,
    backgroundColor:'#eee'
  },
  info:{
    flex:1
  },
  name:{
    color:'#333',
    fontSize:16,
    fontWeight:'600'
  },
  price:{
    color:'#2ecc71',              // ✅ verde para precios
    fontSize:14,
    fontWeight:'bold',
    marginTop:4
  },
  category:{
    color:'#888',
    fontSize:12,
    marginTop:2
  },
  deleteButton:{
    backgroundColor:'#e74c3c',    // ✅ rojo para eliminar
    padding:8,
    borderRadius:6
  }
});
