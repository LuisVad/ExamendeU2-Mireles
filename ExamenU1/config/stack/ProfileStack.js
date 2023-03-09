import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Profile from '../../modules/profile/Profile'
import UserLogged from '../../modules/profile/UserLogged';
const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerMode: 'screen', headerTintColor: 'white', headerStyle: {backgroundColor: '#A1278B'}}}>
        <Stack.Screen name='profileStack' options={{title: 'Perfil'}} component={Profile}/>
        <Stack.Screen name='userLoggedStack' options={{ title: 'Bienvenido' }} component={UserLogged}/>
    </Stack.Navigator>
  )
}