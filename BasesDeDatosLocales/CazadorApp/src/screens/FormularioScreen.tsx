import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons"; // Agregamos los íconos

export default function FormularioScreen({ route, navigation }: any) {
    const db = useSQLiteContext();

    const idEdicion = route.params?.id;
    const tituloEdicion = route.params?.tituloActual || '';
    const califEdicion = route.params?.calificacionActual?.toString() || '';
    const comenEdicion = route.params?.comentariosActuales || '';
    const fotoEdicion = route.params?.fotoActual || null;

    const [titulo, setTitulo] = useState(tituloEdicion);
    const [calificacion, setCalificacion] = useState(califEdicion);
    const [comentarios, setComentarios] = useState(comenEdicion);
    const [fotoPreview, setFotoPreview] = useState(fotoEdicion);

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

    const guardarEditar = async () => {
        const fechaActual = new Date().toLocaleDateString();

        // Pequeña validación para evitar guardar registros vacíos
        if (!titulo || !calificacion) {
            return Alert.alert('Atención', 'Por favor llena el título y la calificación');
        }

        if (idEdicion) {
            try {
                await db.runAsync(
                    `UPDATE registros SET titulo = ?, calificacion = ?, comentarios = ?, fotoBase64=?, fecha = ? WHERE id = ?`,
                    [titulo, calificacion, comentarios, fotoPreview, fechaActual, idEdicion]
                );
                Alert.alert("Éxito", "Guardado con éxito");
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', 'Error al editar el registro!');
                console.log('Error al editar registro: ', error);
            }
        } else {
            try {
                await db.runAsync(
                    `INSERT INTO registros(titulo, calificacion, comentarios, fotoBase64, fecha)
                    VALUES(?,?,?,?,?)`, [titulo, calificacion, comentarios, fotoPreview, fechaActual]
                );
                Alert.alert("Éxito", "Guardado con éxito");
                navigation.goBack();
            } catch (error) {
                console.error("Error al guardar:", error);
                Alert.alert('Error', 'No se pudo guardar');
            }
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                <Text style={styles.headerTitle}>
                    {idEdicion ? 'Ajusta tus datos' : '¡Nueva Aventura!'}
                </Text>

                <TouchableOpacity style={styles.imagePicker} onPress={abrirCamara}>
                    {fotoPreview ? (
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${fotoPreview}` }}
                            style={styles.imagePreview}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Ionicons name="camera-outline" size={40} color="#D4AF37" />
                            <Text style={styles.imagePlaceholderText}>Tomar Foto</Text>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre del Platillo / Lugar</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ej: Ceviche peruano'
                        placeholderTextColor="#999"
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Calificación (1 al 5)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Ej: 4.5'
                        placeholderTextColor="#999"
                        keyboardType="decimal-pad"
                        value={calificacion}
                        onChangeText={setCalificacion}
                        maxLength={3}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Comentarios de la experiencia</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder='Texturas, aromas, atención...'
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={4}
                        value={comentarios}
                        onChangeText={setComentarios}
                        textAlignVertical="top"
                    />
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={guardarEditar}>
                    <Text style={styles.saveButtonText}>Guardar Aventura</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F8F6', // Fondo crema elegante
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C2C2C',
        textAlign: 'center',
        marginBottom: 20,
    },
    imagePicker: {
        alignSelf: 'center',
        width: 160,
        height: 160,
        borderRadius: 80, // Circular
        backgroundColor: '#FFFFFF',
        marginBottom: 30,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePlaceholderText: {
        marginTop: 8,
        fontSize: 14,
        color: '#888',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C2C2C',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#2C2C2C',
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    textArea: {
        minHeight: 100,
        paddingTop: 14,
    },
    saveButton: {
        backgroundColor: '#1E1E1E', // Botón oscuro elegante
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        elevation: 5,
        shadowColor: '#1E1E1E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    saveButtonText: {
        color: '#FDFBF7',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    }
});