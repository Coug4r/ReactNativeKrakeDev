import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useState, useEffect } from 'react';

type Viaje = {
    id: number,
    titulo: string,
    fotoBase64: string,
    fecha: string
};

export default function listaViajesScreen({ navigation }: any) {
    const db = useSQLiteContext();
    const [viajes, setviajes] = useState<Viaje[]>([]);

    const cargarViajes = async () => {
        try {
            const resultado = await db.getAllAsync<Viaje>(
                'SELECT * FROM viajes ORDER BY id DESC'
            );
            setviajes(resultado);
        } catch (error) {
            console.error("Error al cargar viajes:", error);
        }
    };

    useEffect(() => {
        const unsuscribe = navigation.addListener('focus', () => {
            cargarViajes();
        });
        return unsuscribe;
    }, [navigation]);

    const borrarViaje = async (id: number) => {
        try {
            await db.runAsync('DELETE FROM viajes WHERE id = ?', [id]);
            cargarViajes();
        } catch (error) {
            console.error("Error al borrar viaje:", error);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={viajes}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Aun no hay viajes...</Text>}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${item.fotoBase64}` }}
                            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.titulo}</Text>
                            <Text style={{ color: '#666' }}>{item.fecha}</Text>
                        </View>
                        <TouchableOpacity onPress={() => borrarViaje(item.id)}>
                            <Text style={{ color: 'red' }}>Borrar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            
            {/* CORRECCIÓN APLICADA AQUÍ */}
            <TouchableOpacity 
                style={styles.fab} 
                onPress={() => navigation.navigate("NuevoViaje")}
            >
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    }
});