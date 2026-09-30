import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './src/screens/DetailScreen';
import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler'
import DrawerNavigator from './src/Navigators/DrawerNavigator';


export type RootStackParamList ={
  MainDrawer: undefined,
  Detail: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainDrawer'>

        <Stack.Screen
          name='MainDrawer'
          component={DrawerNavigator}
          options={{headerShown:false}}
        />

        <Stack.Screen
          name='Detail'
          component={DetailScreen}
          options={{title:'Detalles Producto'}}
        />

      </Stack.Navigator>
    </NavigationContainer>
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
