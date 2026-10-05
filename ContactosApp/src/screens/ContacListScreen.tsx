import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useContacts } from '../context/ContactContext';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen({navigation}:any){
  const {contacts, deleteContact} = useContacts();

  return (
    <View style={styles.container}>
      {/* Botón añadir contacto */}
      <TouchableOpacity style={styles.addButton} onPress={()=> navigation.navigate('AddContact')}>
        <Ionicons name="person-add-outline" size={20} color="#fff" style={styles.icon}/>
        <Text style={styles.addButtonText}>Añadir Contacto</Text>
      </TouchableOpacity>

      {/* Lista de contactos */}
      <FlatList
        data={contacts}
        keyExtractor={(item)=>item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({item})=>(
          <View style={styles.card}>
            {item.fotoBase64 ? (
              <Image
                source={{uri: `data:image/jpeg;base64, ${item.fotoBase64}`}}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.noImage}>
                <Ionicons name="person-circle-outline" size={40} color="#bbb" />
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.name}>{item.nombre}</Text>
              <View style={styles.row}>
                <Ionicons name="call-outline" size={16} color="#555" style={styles.icon}/>
                <Text style={styles.phone}>{item.celulat}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="location-outline" size={16} color="#555" style={styles.icon}/>
                <Text style={styles.gps}>{item.latitud}, {item.longitud}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={()=> deleteContact(item.id)}>
              <Ionicons name="trash-outline" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5', // gris claro neutro
    padding:16,
  },
  addButton:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#3f51b5', // azul profesional
    paddingVertical:10,
    borderRadius:8,
    justifyContent:'center',
    marginBottom:16,
  },
  addButtonText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'600',
    marginLeft:8,
  },
  listContainer:{
    paddingBottom:20,
  },
  card:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:10,
    padding:12,
    marginBottom:12,
    elevation:2,
    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowRadius:4,
  },
  avatar:{
    width:50,
    height:50,
    borderRadius:25,
    marginRight:12,
  },
  noImage:{
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:'#e0e0e0',
    alignItems:'center',
    justifyContent:'center',
    marginRight:12,
  },
  info:{
    flex:1,
  },
  name:{
    fontSize:16,
    fontWeight:'bold',
    color:'#333',
    marginBottom:4,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:2,
  },
  icon:{
    marginRight:6,
  },
  phone:{
    fontSize:14,
    color:'#555',
  },
  gps:{
    fontSize:12,
    color:'#777',
  },
  deleteButton:{
    backgroundColor:'#e53935', // rojo sobrio para eliminar
    padding:8,
    borderRadius:6,
    alignItems:'center',
    justifyContent:'center',
  },
});
