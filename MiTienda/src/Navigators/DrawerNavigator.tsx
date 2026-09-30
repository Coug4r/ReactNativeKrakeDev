import {createDrawerNavigator} from "@react-navigation/drawer";
import TabNavigator from "./Tabnavigator";
import DetailScreen from "../screens/DetailScreen";
const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
  return (
    <Drawer.Navigator initialRouteName="Panel">
        <Drawer.Screen
            name="Panel"
            component={TabNavigator}
            options={{title:'Panel Principal'}}
        />
        <Drawer.Screen
            name="Acceso a Detalles"
            component={DetailScreen}
            options={{title:'Ver Producto'}}
        />
    </Drawer.Navigator>
  );
}
