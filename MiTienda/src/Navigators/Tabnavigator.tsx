import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
  return (
    <Tab.Navigator screenOptions={({route})=>({
        
        headerShown:false,

        tabBarIcon:({focused, color, size})=>{
            let iconName: any = 'List';
            if(route.name == 'Inicio Tab'){
                iconName = focused? 'cube' : 'cube-outline'
            }else if(route.name == 'Perfil Tab'){
                iconName = focused? 'person' : 'person-outline'
            }
            return <Ionicons name={iconName} size={size} color={color}/>
        },
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: 'gray'  
    })}>
        <Tab.Screen
            name='Inicio Tab'
            component={HomeScreen}
            options={{title:'Invetario'}}
        />
        <Tab.Screen
            name='Perfil Tab'
            component={ProfileScreen}
            options={{title:'Perfil'}}
        />
    </Tab.Navigator>
  );
}