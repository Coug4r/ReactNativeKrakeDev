import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
const Tab = createBottomTabNavigator();

import React from 'react';
import { View, Text } from 'react-native';

export default function TabNavigator(){
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
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