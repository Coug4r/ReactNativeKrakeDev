import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RoutineListScreen from "../screens/RoutineListScreen";
import ProgressScrean from "../screens/ProgressScrean";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000", // fondo negro
          borderTopColor: "#2df600", // línea superior verde
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = "list";
          if (route.name === "Progreso Tab") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          } else if (route.name === "Rutinas Tab") {
            iconName = focused ? "body" : "body-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2df600", // verde brillante
        tabBarInactiveTintColor: "gray", // gris para inactivos
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="Rutinas Tab"
        component={RoutineListScreen}
        options={{ title: "Rutinas" }}
      />
      <Tab.Screen
        name="Progreso Tab"
        component={ProgressScrean}
        options={{ title: "Progreso" }}
      />
    </Tab.Navigator>
  );
}
