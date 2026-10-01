import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import { RoutineProvider } from './src/context/RoutineContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import AddRoutineScreen from './src/screens/AddRoutineScreen';
export type RootStackParamList = {
  MainDrawer: undefined;
  AddRoutine: undefined;
  Detail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>  
      <RoutineProvider>
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
              name="AddRoutine"
              component={AddRoutineScreen}
              options={({route})=>({
                title: route.params?.id ? 'Editar Rutina' : 'Nueva Rutina'
              })} 
            />
            <Stack.Screen
              name="Detail"
              component={RoutineDetailScreen}
              options={{title:'Detalles de la rutina'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RoutineProvider>
    </GestureHandlerRootView>
  );
}