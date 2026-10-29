import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";

type Registro = {
    id: number,
    titulo: string,
    calificacion: number,
    comentarios: string,
    fotoBase64: string,
    fecha: string
}

export default function ListaScreen({ navigation }: any) {
    const db = useSQLiteContext();
    const [registros, setRegistros] = useState<Registro[]>([]);

    const cargarRegistros = async () => {
        try {
            const resultado = await db.getAllAsync<Registro>(
                'SELECT * FROM registros ORDER BY id DESC'
            );
            setRegistros(resultado);
        } catch (error) {
            console.log('Error al cargar los registros!', error);
        }
    };

    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', () => {
            cargarRegistros();
        });
        return unsuscribe;
    }, [navigation]);

    const borrarRegistros = async (id: number) => {
        try {
            await db.runAsync('DELETE FROM registros WHERE id = ?', [id]);
            cargarRegistros();
        } catch (error) {
            console.error('Error al borrar el registro!', error);
        }
    };

    const renderEstrellas = (calificacion: number) => {
        return (
            <View style={styles.starsContainer}>
                <Ionicons name="star" size={14} color="#D4AF37" />
                <Text style={styles.ratingText}>{calificacion}/5</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={registros}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="restaurant-outline" size={60} color="#ccc" />
                        <Text style={styles.emptyText}>No hay experiencias gourmet aún</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${item.fotoBase64}` }}
                            style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title} numberOfLines={1}>{item.titulo}</Text>
                            <Text style={styles.date}>{item.fecha}</Text>

                            {renderEstrellas(item.calificacion)}

                            <Text style={styles.comments} numberOfLines={2}>
                                "{item.comentarios}"
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => borrarRegistros(item.id)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="trash-outline" size={20} color="#A83232" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => navigation.navigate('FormularioScreen', {
                                id: item.id,
                                tituloActual: item.titulo,
                                calificacionActual: item.calificacion,
                                comentariosActuales: item.comentarios,
                                fotoActual: item.fotoBase64
                            })}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="pencil-outline" size={20} color="#4A4A4A" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('FormularioScreen.tsx')}
            >
                <Ionicons name="add" size={30} color="#FDFBF7" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F8F6', // Un tono crema/blanco roto muy sutil y elegante
    },
    listContainer: {
        padding: 16,
        paddingBottom: 100, // Espacio extra abajo para que el FAB no tape el último elemento
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        // Sombras elegantes
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 12,
        backgroundColor: '#EBEBEB',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C2C2C', // Gris muy oscuro en lugar de negro puro
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: '#888888',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#D4AF37', // Tono dorado "Gourmet"
        marginLeft: 4,
    },
    comments: {
        fontSize: 13,
        color: '#555555',
        fontStyle: 'italic',
        lineHeight: 18,
    },
    deleteButton: {
        padding: 4,
        justifyContent: 'flex-start',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#1E1E1E', // Botón oscuro, muy premium
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1E1E1E',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 16,
        fontStyle: 'italic',
    },
    actionsContainer: {
        flexDirection: 'column', // Cambia a 'row' si los quieres uno al lado del otro
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingLeft: 8,
    },
    actionButton: {
        padding: 4,
        marginBottom: 12, // Espacio entre el botón de editar y borrar
    }
});