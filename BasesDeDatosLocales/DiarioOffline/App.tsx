import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { initDatabase } from './src/database/database';
import listaViajesScreen from './src/screens/listaViajesScreen';
import NuevoViajeScreen from './src/screens/NuevoViajeScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  const [dbLista, setdbLista] = useState(false);
  useEffect(() => {
    const prepararDB = async () => {
      await initDatabase()
      setdbLista(true)
    };
    prepararDB();
  }, []);
  if (!dbLista) {
    return (
      <View>
        <ActivityIndicator
          size='large'
          color='blue'
        />
        <Text>Cargando Base de Datos</Text>
      </View>
    )
  }
  return (
    <View>
      <SQLiteProvider databaseName='diario.db'>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Lista Viajes'
              component={listaViajesScreen}
              options={{ title: "Mis viajes!" }}
            />
            <Stack.Screen
              name='NuevoViaje'
              component={NuevoViajeScreen}
              options={{ title: "Registrar Viaje" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
