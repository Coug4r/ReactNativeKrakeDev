import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useContacts } from '../context/ContactContext';
import { Ionicons } from '@expo/vector-icons';

export default function AddContact({navigation}: any){
  const {addContact} = useContacts();
  const [nombre, setNombre] = useState('');
  const [celulat, setCelular] = useState('');
  const [fotoBase64, setFotoBase64] = useState<string|undefined>();
  const [latitud, setLatitud] = useState<number|undefined>();
  const [longitud, setLongitud] = useState<number|undefined>();
  
  const tomarFoto = async ()=>{
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== 'granted') return Alert.alert('Error', 'Permiso denegado!');
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.3,
    });

    if(!result.canceled && result.assets[0].base64){
      setFotoBase64(result.assets[0].base64);
    } 
  }

  const obtenerUbicacion = async ()=>{
    const {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') Alert.alert('Error', 'Permiso denegado!');
    const ubicacion = await Location.getCurrentPositionAsync({});
    setLatitud(ubicacion.coords.latitude);
    setLongitud(ubicacion.coords.longitude);
    Alert.alert('Éxito', 'Ubicación capturada!');
  }
    
  const guardar = async ()=>{
    if(!nombre || !celulat) return;
    const exito = await addContact({nombre, celulat, fotoBase64, latitud, longitud});
    if(exito) navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder='Nombre'
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          value={celulat}
          onChangeText={setCelular}
          placeholder='099999999'
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={tomarFoto}>
            <Ionicons name="camera-outline" size={20} color="#fff"/>
            <Text style={styles.actionText}>Tomar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={obtenerUbicacion}>
            <Ionicons name="location-outline" size={20} color="#fff"/>
            <Text style={styles.actionText}>Ubicación</Text>
          </TouchableOpacity>
        </View>

        {fotoBase64 && (
          <Image 
            source={{uri: `data:image/jpeg;base64, ${fotoBase64}`}} 
            style={styles.avatarPreview}
          />
        )}
        {latitud && (
          <Text style={styles.gpsText}>GPS: {latitud.toFixed(4)}, {longitud?.toFixed(4)}</Text>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={guardar}>
          <Ionicons name="save-outline" size={20} color="#fff"/>
          <Text style={styles.saveButtonText}>Guardar Contacto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5',
    padding:16,
  },
  card:{
    backgroundColor:'#fff',
    borderRadius:12,
    padding:20,
    elevation:3,
    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowRadius:4,
  },
  input:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:8,
    padding:10,
    marginBottom:12,
    fontSize:14,
    color:'#333',
    backgroundColor:'#fafafa',
  },
  actionsRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:12,
  },
  actionButton:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#3f51b5', // azul neutro profesional
    paddingVertical:8,
    paddingHorizontal:12,
    borderRadius:8,
  },
  actionText:{
    color:'#fff',
    fontSize:14,
    marginLeft:6,
  },
  avatarPreview:{
    width:100,
    height:100,
    borderRadius:50,
    marginTop:10,
    alignSelf:'center',
  },
  gpsText:{
    fontSize:12,
    color:'#555',
    marginTop:8,
    textAlign:'center',
  },
  saveButton:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#4CAF50', // verde suave para acción principal
    paddingVertical:12,
    borderRadius:8,
    marginTop:16,
  },
  saveButtonText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
    marginLeft:6,
  },
});
