import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import ChestdetailScreen from './src/screens/ChestDetailScreen';

export type RootStackParamList = {
  MainDrawer: undefined;
  ChestRutine: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainDrawer"
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#00FF00', 
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="MainDrawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChestRutine"
          component={ChestdetailScreen}
          options={{ title: 'Rutina de Pecho' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}