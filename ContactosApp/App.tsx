import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactScreen from './src/screens/ContacListScreen';
import AddContact from './src/screens/AddContactScreen';
import { ContactProvider } from './src/context/ContactContext';

export type RootStackParamList = {
  Home: undefined,
  AddContact: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <ContactProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={ContactScreen}
            options={{title:'Mis Contactos'}}
          />

          <Stack.Screen
            name='AddContact'
            component={AddContact}
            options={{title:'Nuevo Cotacto'}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </ContactProvider>
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
