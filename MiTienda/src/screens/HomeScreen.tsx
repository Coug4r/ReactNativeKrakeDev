import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '../context/PorductoContext';
import React from 'react';

export default function HomeScreen({navigation}:any){
  const {products, deleteProduct} = useProducts();

  return(
    <SafeAreaView style={styles.container}>
      {/* Botón de agregar producto */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={()=>navigation.navigate('AddProduct')}
        >
          <Ionicons name='add' size={24} color='white'/>
        </TouchableOpacity>
      </View>

      {/* Lista de productos */}
      <FlatList 
        data={products} 
        keyExtractor={(item)=> item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({item})=>{
          return(
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={()=> navigation.navigate('AddProduct', {id:item.id})}
                >
                  <Ionicons name='pencil' size={22} color='#FF9800' />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={()=> navigation.navigate('Detail', {id: item.id})}
                >
                  <Ionicons name='eye' size={22} color='#2196F3'/>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton} 
                  onPress={()=>deleteProduct(item.id)}
                >
                  <Ionicons name='trash' size={22} color='#E53935'/>
                </TouchableOpacity>
              </View>
            </View>
          )
        }} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5F5F5',
  },
  header:{
    padding:16,
    alignItems:'flex-end',
  },
  addButton:{
    backgroundColor:'#4CAF50',
    padding:10,
    borderRadius:50,
    elevation:3,
  },
  listContainer:{
    paddingHorizontal:16,
    paddingBottom:20,
  },
  card:{
    backgroundColor:'#fff',
    borderRadius:10,
    padding:16,
    marginBottom:12,
    elevation:2,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  cardContent:{
    flex:1,
    marginRight:10,
  },
  productName:{
    fontSize:16,
    fontWeight:'bold',
    color:'#333',
  },
  productPrice:{
    fontSize:14,
    color:'#4CAF50',
    marginVertical:4,
  },
  productDescription:{
    fontSize:13,
    color:'#666',
  },
  actions:{
    flexDirection:'row',
  },
  actionButton:{
    marginHorizontal:6,
  }
});
