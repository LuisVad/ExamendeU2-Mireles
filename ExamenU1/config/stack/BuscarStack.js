import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Buscar from '../../modules/buscar/Buscar'
const Stack = createNativeStackNavigator();
import React from 'react'

const BuscarStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerMode: 'screen', headerTintColor: 'white', headerStyle: { backgroundColor: '#30705A' }}}>
            <Stack.Screen name='buscarStack' options={{ title: 'Buscar' }} component={Buscar}/>
    </Stack.Navigator>
  )
}

export default BuscarStack