import React, {useState, useEffect} from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useProducts } from '../context/PorductoContext';
import { TextInput } from 'react-native-gesture-handler';

export default function AddProductScreen({navigation, route}: any){

  const {addProduct, updateProduct, products} = useProducts();
  const idToEdit = route.params?.id;

  const [name, setName] = useState('');
  const [priceString, setPriceString] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=>{
    if(idToEdit){
      const productFound = products.find(p=> p.id === idToEdit)
      if(productFound){
        setName(productFound.name)
        setPriceString(productFound.price.toString())
        setDescription(productFound.description)
      }
    }
  }, [idToEdit])

  const handleSave = ()=>{
    if(!name || !priceString){
      Alert.alert('Error', 'Faltan datos requeridos!')
      return
    }
    const priceNumber = parseFloat(priceString);
    if(isNaN(priceNumber)){
      Alert.alert('Error', "El precio debe ser un número válido!")
      return
    }

    if(idToEdit){
      updateProduct(idToEdit, {name, price: priceNumber, description})
    }else{
      addProduct({name, price: priceNumber, description})
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ingrese nombre"
        />

        <Text style={styles.label}>Precio:</Text>
        <TextInput
          style={styles.input}
          value={priceString}
          onChangeText={setPriceString}
          keyboardType='numeric'
          placeholder="Ingrese precio"
        />

        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Ingrese descripción"
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {idToEdit ? 'Actualizar' : 'Guardar'}
          </Text>
        </TouchableOpacity>
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
  label:{
    fontSize:14,
    fontWeight:'bold',
    color:'#333',
    marginBottom:6,
  },
  input:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:8,
    padding:10,
    marginBottom:12,
    fontSize:14,
    backgroundColor:'#FAFAFA',
  },
  textArea:{
    height:80,
    textAlignVertical:'top',
  },
  saveButton:{
    backgroundColor:'#4CAF50',
    paddingVertical:12,
    borderRadius:8,
    alignItems:'center',
    marginTop:10,
  },
  saveButtonText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
  }
});
