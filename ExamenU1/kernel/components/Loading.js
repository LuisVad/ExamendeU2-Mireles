import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function Loading(props) {
    console.log(props);
    const {show, text} = props
  return (
    <Overlay isVisible={show} windowsBackgroundColor='rgb(0,0,0,0.5)' overlayBackgroundColor='transparent' overlayStyle={styles.overlay}>
        <View>
            <ActivityIndicator size='large' color="#007bff"/>
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay: {
        height: 169,
        width: 250, 
        backgroundColor: '#FFF',
        borderColor: '#FFF',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '',
        textTransform: 'uppercase',
        marginTop: 10,
        textAlign: 'center'
    }
})