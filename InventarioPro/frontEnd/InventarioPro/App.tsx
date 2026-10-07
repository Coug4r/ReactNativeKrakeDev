import { StyleSheet } from 'react-native';
import { ProductProvider } from './src/context/ProductContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductScreen from './src/screens/ProductsScreen';
import NewProductScreen from './src/screens/NewProductScreen';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ProductProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 3 }}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#3498db",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: {
                  backgroundColor: "#fff",
                  borderTopColor: "#eee",
                  height: 60,             
                  paddingBottom: 0,       
                  position: "absolute",   
                },
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: any;
                  if (route.name === "Productos") {
                    iconName = focused ? "list" : "list-outline";
                  } else if (route.name === "Nuevo Producto") {
                    iconName = focused ? "add-circle" : "add-circle-outline";
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Productos" component={ProductScreen} />
              <Tab.Screen name="Nuevo Producto" component={NewProductScreen} />
            </Tab.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </ProductProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
