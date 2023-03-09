import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Inicio from '../../modules/inicio/Inicio';
import Pantalla2 from '../../modules/inicio/Pantalla2'
const Stack = createNativeStackNavigator();
import React from 'react'

const InicioStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerMode: 'screen', headerTintColor: 'white', headerStyle: { backgroundColor: '#1728D6' }}}>
        <Stack.Screen name='buscarStack' options={{ title: 'Inicio' }} component={Inicio}/>
        <Stack.Screen name='pantalla2Stack' options={{ title: 'Bienvenido' }} component={Pantalla2}/>
    </Stack.Navigator>
  )
}

export default InicioStack