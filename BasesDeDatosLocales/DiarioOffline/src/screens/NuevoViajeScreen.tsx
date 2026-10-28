import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function NuevoViajeScreen({ navigation }: any) {
    const db = useSQLiteContext();
    const [titulo, setTitulo] = useState('');
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    const abrirCamara = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') return Alert.alert('Error', 'Permisos denegados');
        
        const results = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 0.3
        });

        if (!results.canceled && results.assets && results.assets.length > 0) {
            setFotoPreview(results.assets[0].base64 || null);
        }
    };

    const guardar = async () => {
        if (!titulo.trim() || !fotoPreview) {
            return Alert.alert('Error', 'Faltan el título o la imagen');
        }

        const fechaActual = new Date().toLocaleDateString();

        try {
            await db.runAsync(
                'INSERT INTO viajes (titulo, fotoBase64, fecha) VALUES (?, ?, ?)',
                [titulo, fotoPreview, fechaActual]
            );
            Alert.alert("Éxito", "Guardado con éxito");
            navigation.goBack();
        } catch (error) {
            console.error("Error al guardar:", error);
            Alert.alert('Error', 'No se pudo guardar');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>¿A dónde fuiste?</Text>
            <TextInput
                style={styles.input}
                placeholder='Ej: Viaje a Bogotá'
                value={titulo}
                onChangeText={setTitulo}
            />

            <TouchableOpacity style={styles.button} onPress={abrirCamara}>
                <Text style={styles.buttonText}>Tomar una foto</Text>
            </TouchableOpacity>

            {/* CORRECCIÓN: Se agregó estilo con width y height para que la imagen se vea */}
            {fotoPreview && (
                <Image 
                    source={{ uri: `data:image/jpeg;base64,${fotoPreview}` }}
                    style={styles.previewImage}
                />
            )}

            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={guardar}>
                <Text style={styles.buttonText}>Guardar en memoria</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    saveButton: {
        backgroundColor: '#34C759',
        marginTop: 10
    },
    previewImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignSelf: 'center',
        marginBottom: 20
    }
});