import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useProducts } from '../context/ProductContext';

export default function AddProduct({ navigation, route }: any) {
  const { addProducts, updateProducts, products } = useProducts();
  const [nombre, setNombre] = useState('');
  const [precioString, setPrecioString] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fotoBase64, setFotoBase64] = useState<string | undefined>();
  const [codigoBarras, setCodigoBarras] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const idToEdit = route.params?.id;

  useEffect(() => {
    if (idToEdit) {
      const productFound = products.find(p => p.id === idToEdit);
      if (productFound) {
        setNombre(productFound.nombre);
        setPrecioString(productFound.precio.toString());
        setCategoria(productFound.categoria);
        setFotoBase64(productFound.fotoBase64);
        setCodigoBarras(productFound.codigoBarras || '');
      }
    }
  }, [idToEdit]);

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Error', 'Permiso denegado!');
    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.3,
    });
    if (!result.canceled && result.assets[0].base64) {
      setFotoBase64(result.assets[0].base64);
    }
  };

  const handleBarCodeScanned = ({ data }: any) => {
    setShowScanner(false);
    setCodigoBarras(data);
    Alert.alert("Código escaneado", `Código: ${data}`);
  };

  const handleSave = async () => {
    if (!nombre || !precioString) {
      Alert.alert('Error', 'Faltan datos requeridos!');
      return;
    }
    const priceNumber = parseFloat(precioString);
    if (isNaN(priceNumber)) {
      Alert.alert('Error', "El precio debe ser un número válido!");
      return;
    }
    await addProducts({ nombre, precio: priceNumber, categoria, fotoBase64, codigoBarras });
    setNombre('');
    setPrecioString('');
    setCategoria('');
    setFotoBase64('');
    setCodigoBarras('');
    navigation.goBack();
  };

  if (showScanner) {
    if (!permission?.granted) {
      return (
        <View style={styles.scrollContainer}>
          <Text>Necesitas dar permiso a la cámara</Text>
          <TouchableOpacity onPress={requestPermission}>
            <Text>Dar permiso</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <CameraView style={{ flex: 1 }} onBarcodeScanned={handleBarCodeScanned} />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>{idToEdit ? "Editar Producto" : "Nuevo Producto"}</Text>

      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder='Nombre' placeholderTextColor="#aaa" />
      <TextInput style={styles.input} value={precioString} onChangeText={setPrecioString} placeholder='Precio' keyboardType="numeric" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder='Categoría' placeholderTextColor="#aaa" />
      <TextInput style={styles.input} value={codigoBarras} onChangeText={setCodigoBarras} placeholder='Código de Barras' placeholderTextColor="#aaa" />

      <TouchableOpacity style={styles.photoButton} onPress={tomarFoto}>
        <Ionicons name="camera-outline" size={20} color="#fff" />
        <Text style={styles.photoButtonText}>Tomar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.scanButton} onPress={() => setShowScanner(true)}>
        <Ionicons name="qr-code-outline" size={20} color="#fff" />
        <Text style={styles.scanButtonText}>Escanear Código</Text>
      </TouchableOpacity>

      {fotoBase64 && (
        <Image source={{ uri: `data:image/jpeg;base64,${fotoBase64}` }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name="save-outline" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>{idToEdit ? "Actualizar" : "Guardar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer:{
    paddingHorizontal:20,
    paddingTop:30,
    paddingBottom:40, // ✅ espacio extra para que el botón no quede pegado
    backgroundColor:'#f9f9f9',
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:25,
    color:'#222',
    textAlign:'center'
  },
  input:{
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:10,
    padding:12,
    marginBottom:18,
    fontSize:16,
    color:'#111',
    shadowColor:'#000',
    shadowOpacity:0.05,
    shadowRadius:3,
    elevation:2
  },
  photoButton:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#3498db',
    padding:14,
    borderRadius:10,
    marginBottom:15,
    justifyContent:'center'
  },
  photoButtonText:{
    color:'#fff',
    fontSize:16,
    marginLeft:8,
    fontWeight:'600'
  },
  scanButton:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#9b59b6',
    padding:14,
    borderRadius:10,
    marginBottom:20,
    justifyContent:'center'
  },
  scanButtonText:{
    color:'#fff',
    fontSize:16,
    marginLeft:8,
    fontWeight:'600'
  },
  image:{
    width:'100%',
    height:220,
    borderRadius:10,
    marginBottom:20,
    backgroundColor:'#eee'
  },
  saveButton:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#2ecc71',
    padding:16,
    borderRadius:10,
    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowRadius:4,
    elevation:3
  },
  saveButtonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
    marginLeft:8
  }
});
