import { View, Text, TouchableOpacity, Image, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker'

export default function NuevoViajeScreen({ navigation }: any) {
    const db = useSQLiteContext();
    const [titulo, setTitulo] = useState('');
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    const abrirCamara = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') return Alert.alert('Error', 'Permisos denegados')
        const results = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 0.3
        });

        if (!results.canceled && results.assets[0].base64) {
            setFotoPreview(results.assets[0].base64)
        }
    }

    const guardar = async ()=>{
        if(!titulo || !fotoPreview){
            return Alert.alert('Error', 'Faltan el titulo o la imagen')
        }

        const fechaActual = new Date().toLocaleDateString();

        try {
            await db.runAsync(
                'INSERT INTO viajes (titulo, fotoBase64, fecha) VALUES(?,?,?)'
                ,[titulo, fotoPreview, fechaActual]
            )
            Alert.alert("Exito", "Guardado con Exito")
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar')
        }
    };

    return (
        <View>
            <Text>
                ¿A donde fuiste?
            </Text>
            <TextInput
                placeholder='Ej: Viaje a Bogota'
                value={titulo}
                onChangeText={setTitulo}
            />

            <TouchableOpacity onPress={abrirCamara}>
                <Text>Tomar una foto</Text>
            </TouchableOpacity>
            {fotoPreview && (
                <Image source={{ uri: `data:image/jpeg;base64, ${fotoPreview}`}}/>
            )}
            <TouchableOpacity onPress={guardar}>
                <Text>Guardar en memoria</Text>
            </TouchableOpacity>
        </View>
    );
}
