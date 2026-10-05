import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useContacts } from '../context/ContactContext';


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
      Alert.alert('Exito', 'Ubicacion capturada!')
    }
    
  const guardar = async ()=>{
    if(!nombre || !celulat) return;
    const exito = await addContact({nombre, celulat, fotoBase64, latitud, longitud});
    if(exito) navigation.goBack();
  };

  return (
    <View>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder='Nombre'
      />
      <TextInput
        value={celulat}
        onChangeText={setCelular}
        placeholder='099999999'
      />
      <TouchableOpacity onPress={tomarFoto}>
        <Text>Tomar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={obtenerUbicacion}>
        <Text>Ubicacion</Text>
      </TouchableOpacity>
      {fotoBase64 && (<Image source={{uri: `data:image/jpeg;base64, ${fotoBase64}`}} style={{width:100, height: 100, marginTop: 10}}/>)}
      {latitud && (<Text>GPS: {latitud.toFixed(4)} {longitud?.toFixed(4)}</Text>)}

      <TouchableOpacity onPress={guardar}>
        <Text>Guardar Contacto</Text>
      </TouchableOpacity>
    </View>
  );
}