import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
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
        const resultado = await db.getAllAsync<Viaje>(
            'SELECT * FROM viajes ORDER BY id DESC'
        );
        setviajes(resultado);
    };
    useEffect(() => {
        const unsuscribe = navigation.addListner('focus', () => {
            cargarViajes();
        });
        return unsuscribe;
    }, [navigation]);

    const borrarViaje = async (id: number) => {
        await db.runAsync('DELETE FROM viajes WHERE id = ?', [id]);
        cargarViajes();
    }
    return (
        <View>
            <FlatList
                data={viajes}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text>Aun no hay viajes...</Text>}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: `data:image/jpeg;base64, ${item.fotoBase64}` }}
                            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 15 }}
                        />
                        <View>
                            <Text>{item.titulo}</Text>
                            <Text>{item.fecha}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>borrarViaje(item.id)}>
                            <Text>Borrar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity onPress={navigation.navigate("NuevoViaje")}>
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
};  