import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './src/screens/DetailScreen';
import { StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import DrawerNavigator from './src/Navigators/DrawerNavigator';
import { ProductProvider } from './src/context/PorductoContext';
import AddProductScreen from './src/screens/AddProduct';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // 👈 IMPORTANTE

export type RootStackParamList ={
  MainDrawer: undefined,
  Detail: undefined,
  AddProduct: {id?:string}
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <ProductProvider>
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
            <Stack.Screen 
              name='AddProduct' 
              component={AddProductScreen} 
              options={({route})=>({
                title: route.params?.id ? 'Editar Producto' : 'Nuevo Producto'
              })} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductProvider>
    </GestureHandlerRootView>
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
