import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RoutineListScreen from "../screens/RoutineListScreen";
import ProgressScrean from "../screens/ProgressScrean";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return(
        <Tab.Navigator screenOptions={({route})=>({
            headerShown: false,
             tabBarIcon:({focused, color, size})=>{
            let iconName: any = 'List';
            if(route.name == 'Progreso Tab'){
                iconName = focused? 'bar-chart' : 'bar-chart-outline'
            }else if(route.name == 'Rutinas Tab'){
                iconName = focused? 'barbell' : 'barbell-outline'
            }
            return <Ionicons name={iconName} size={size} color={color}/>
             },
            tabBarActiveTintColor: '#2df600',
            tabBarInactiveTintColor: 'gray'  
            })}>
            <Tab.Screen
            name='Progreso Tab'
            component={ProgressScrean}
            options={{title:'Progreso'}}
            />
            <Tab.Screen
             name='Rutinas Tab'
             component={RoutineListScreen}
             options={{title:'Rutinas'}}
            />   
        </Tab.Navigator>
    );
}