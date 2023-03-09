import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Icon} from '@rneui/base'
import ProfileStack from '../stack/ProfileStack'
import InicioStack from '../stack/InicioStack'
import BuscarStack from '../stack/BuscarStack'
const Tab = createBottomTabNavigator()

export default function navigation() {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={({route}) => ({ headerShown: false, tabBarIcon: ({color}) => screenOptions(route, color), tabBarActiveTintColor: 'green', tabBarInactiveTintColor: 'gray' })} >
            <Tab.Screen name='profile' options={{title: 'Mi Perfil'}} component={ProfileStack} />
            <Tab.Screen name='start' options={{title: 'Inicio'}} component={InicioStack} />
            <Tab.Screen name='search' options={{title: 'Buscar'}} component={BuscarStack} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
        case 'profile':
            iconName = 'account-outline';
            break;
        case 'start':
            iconName = 'home';
            break;
        case 'search':
            iconName = 'magnify';
            break;    
    }
    return (
        <Icon type='material-community' name={iconName} size={30} color={color} />
    )
}