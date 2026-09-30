import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreen from "../screens/SettingsScreen";
import TabNavigator from "./TabNavigator";
import Ionicons from "@expo/vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#000", // fondo negro
          },
          drawerActiveTintColor: "#2df600", // verde brillante para ítems activos
          drawerInactiveTintColor: "gray", // gris para ítems inactivos
          drawerLabelStyle: {
            fontWeight: "bold",
            fontSize: 14,
          },
          headerStyle: {
            backgroundColor: "#000", // header negro
          },
          headerTintColor: "#2df600", // texto/íconos del header en verde
        }}
      >
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{
            title: "Mi Entrenamiento",
            drawerIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "barbell" : "barbell-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Ajustes"
          component={SettingsScreen}
          options={{
            title: "Configuración",
            drawerIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
  );
}
