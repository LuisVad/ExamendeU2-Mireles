import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../kernel/components/Loading';
import { Avatar } from 'react-native-elements';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Imagepicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { doc, setDoc, getFirestore } from "firebase/firestore";
import {getAuth, updateProfile} from 'firebase/auth'

export default function UserLogged(props) {
  const auth = getAuth();
  const {setReload, user} = props;
  console.log("mi sesión -> ", user);
  const [show, setShow] = useState(false)
  const removeValue = async () => {
    try {
      setShow(true)
      await AsyncStorage.removeItem('@session');
      setShow(false)
      setReload(true)
    } catch(e) {
      setShow(false)
      console.log('Error - UserLogged(12)', e)
    }
  };

  const uploadImage = async (uri) => {
    setShow(true);
    const response = await fetch(uri);
    console.log("respuesta", response);
    const {_bodyBlob} = response;
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/${user.uid}`);
    return uploadBytes(storageRef, _bodyBlob);
  };

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA);
    console.log("permisos ", resultPermission);
    if (resultPermission.granted) {
      let result = await Imagepicker.launchImageLibraryAsync({
          mediaTypes: Imagepicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
      })
      if (!result.canceled) {
          uploadImage(result.assets[0].uri).then ((response)=>{
              console.log("Imagen actualizada");
              uploadPhotoProfile();
          })
          .catch((err)=>{
              console.log("Error", err);
          })
      }else{
          console.log("No se pudo cargar la imagen");
      }
    }
  };

  const uploadPhotoProfile = () => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `avatars/${user.uid}`)) .then((url)=>{
        updateProfile(auth.currentUser,{
            photoURL: url,
        }).then(()=>{
          setShow(false);
        })
    }).catch((err)=>{
      setShow(false);
      console.log("Error al obtener la imagen ", err);
    })
  };
  
  return (
    <View style={styles.container}>
      {user &&(<View style={styles.infoContainer}>
        <Avatar size="xlarge" rounded source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/finanzas-ed9fa.appspot.com/o/avatar%2F2XpKQNZ0KCZOO5atTUxpLYrIz6D3.jpg?alt=media&token=e959134d-0a2b-492f-b8ff-c972ecf34eed' }} containerStyle={styles.avatar}>
          <Avatar.Accessory size={40} onPress={changeAvatar}></Avatar.Accessory>
        </Avatar>
        <View>
          <Text style={styles.displayName}>{user.providerData[0].displayName ? user.providerData[0].displayName : 'Anónimo'}</Text>
          <Text>{user.providerData[0].email}</Text>
        </View>
      </View> )}
      <Button title="Cerrar Sesión" buttonStyle={styles.btn} onPress={()=> auth.signOut()}/>
      <Loading show={show} text="Actualizando imagen"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#FFF"
  },
  btn: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "tomato",
    paddingVertical: 10
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30
  },
  avatar: {
    marginRight: 16
  },
  displayName: {
    fontWeight: 'bold',
    paddingBottom: 5
  }
})