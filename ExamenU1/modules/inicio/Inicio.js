import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {Input, Button, Image, Icon} from '@rneui/base'
import { isEmpty } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../kernel/components/Loading';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Inicio(props) {
    const {navigation} = props;
    const [error, setError] = useState({email: '', password: ''});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [show, setShow] = useState(false)
    //const [failSession, setFailSession] = useState(false);
    const auth = getAuth();
    const login = () => {
      if (!(isEmpty(email) && isEmpty(password))) {
        setShow(true);
        setError({email: '', password: ''});
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          const user = userCredential.user;
          try {
            await AsyncStorage.setItem('@session', JSON.stringify(user))
          } catch (e) {
            console.log("Error -> Login Storage", e)
          }
          setShow(false);
          navigation.navigate("pantalla2Stack");
          console.log(user);
        })
        .catch((error) => {
          setError({email: '', password: 'Usuario o contraseña incorrectos!'});
          setShow(false);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      } else {
        setError({email: 'Campo Obligatorio', password: 'Campo Obligatorio'});
      }
    };
    return (
      <View style={styles.container}>
        <ScrollView>
           <Image source={require('../../assets/instagram.png')} resizeMode='contain' style={styles.logotype}/>
            <Input placeholder='Correo Electrónico' keyboardType='email-address' containerStyle={styles.input} onChange={(event) => setEmail(event.nativeEvent.text)} errorMessage={error.email} autoCapitalize="none"/>
            <Input placeholder='Contraseña' containerStyle={styles.input} onChange={(event) => setPassword(event.nativeEvent.text)} secureTextEntry={showPassword} icon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} color='#007bff' onPress={() => setShowPassword(!showPassword)}/>} errorMessage={error.password}/>
            <Button title='Iniciar Sesión' icon={<Icon type='material-community' name='login' size={22} color='#FFF'/>} onPress={login}></Button>
            <Loading show={show} text='Iniciando Sesión'></Loading>
          </ScrollView>    
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      height: "100%"
    },
    logotype: {
      width: "100%",
      height: 150,
      marginTop: 16,
      marginBottom: 16
    },
    input: {
      width: '100%',
      marginBottom: 10,
    },
    btnSuccess: {
      color: '#FFF',
      backgroundColor: '#28a745'
    },
    btn: {
      backgroundColor: 'tomato',
      color: '#fff'
    },
    btnContainer: {
      margin: 16
    },
    btnCont: {
      width: '95%',
      paddingTop: 10,
      paddingLeft: 30
    },
    createAccount: {
      color: '#007bff'
    }
  
  })