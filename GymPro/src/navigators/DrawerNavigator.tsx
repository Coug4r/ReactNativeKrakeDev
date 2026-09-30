import {createDrawerNavigator} from "@react-navigation/drawer"
import SettingsScreen from "../screens/SettingsScreen"
import TabNavigator from "./TabNavigator"

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){
    return(
        <Drawer.Navigator initialRouteName="Rutinas">
            <Drawer.Screen
                name="Rutinas"
                component={TabNavigator}
                options={{title:'Mis Rutinas'}}
            />
            <Drawer.Screen
                name="Ajustes"
                component={SettingsScreen}
                options={{title:'Settings'}}
            />
        </Drawer.Navigator>
    );
}
