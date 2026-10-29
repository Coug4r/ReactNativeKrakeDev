import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { initDatabase } from './src/database/db';

// IMPORTANTE: Importaciones por defecto (sin llaves)
import ListaScreen from './src/screens/ListaScreen';
import FormularioScreen from './src/screens/FormularioScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
    const [dbLista, setdbLista] = useState(false);

    useEffect(() => {
        const prepararDB = async () => {
            await initDatabase();
            setdbLista(true);
        };
        prepararDB();
    }, []);

    // Pantalla de carga mientras se inicializa SQLite
    if (!dbLista) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='#D4AF37' />
                <Text style={styles.loadingText}>Preparando tu cocina...</Text>
            </View>
        );
    }

    // Se quitó el <View> que envolvía todo para evitar la pantalla en blanco
    return (
        <SQLiteProvider databaseName='cazador.db'>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="ListaSabores"
                    screenOptions={{
                        // Estilos globales para la cabecera (Gourmet)
                        headerStyle: { backgroundColor: '#F9F8F6' },
                        headerTintColor: '#2C2C2C',
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerShadowVisible: false, // Quita la línea debajo del header
                    }}
                >
                    <Stack.Screen
                        name='ListaSabores'
                        component={ListaScreen}
                        options={{ title: 'Mis Experiencias' }}
                    />
                    <Stack.Screen
                        name='FormularioScreen' // Este nombre debe coincidir con el que usas en navigation.navigate()
                        component={FormularioScreen}
                        // El título de esta pantalla lo manejamos dinámicamente desde la misma pantalla con setOptions
                        options={{ title: 'Detalles' }} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SQLiteProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F8F6', // Fondo crema que usamos en las otras pantallas
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 16,
        color: '#2C2C2C',
        fontWeight: '500',
    }
});