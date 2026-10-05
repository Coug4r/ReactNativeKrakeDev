import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useContacts } from '../context/ContactContext';



export default function ContactScreen({navigation}:any){

    const {contacts, deleteContact} = useContacts();

  return (
    <View>
        <TouchableOpacity onPress={()=> navigation.navigate('AddContact')}>
            <Text>Añadir Contacto</Text>
        </TouchableOpacity>

        <FlatList
            data={contacts}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
                <View>
                    {item.fotoBase64 ? (
                        <Image
                            source={{uri: `data:image/jpeg;base64, ${item.fotoBase64}`}}
                            style={{width:50, height: 50, borderRadius: 25}}
                        />
                    ) : <View>SIN IMAGEN</View>}

                    <Text>{item.nombre}</Text>
                    <Text>{item.celulat}</Text>
                    <TouchableOpacity onPress={()=> deleteContact(item.id)}>
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                    
                </View>
            )}
        />
    </View>
  );
}