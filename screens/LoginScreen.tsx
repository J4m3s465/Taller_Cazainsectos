import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';



export default function LoginScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [contrasenia, setcontrasenia] = useState("")

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigation.navigate('Tabs');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                Alert.alert(errorCode, errorMessage)
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>👉INGRESA👈</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Ingresar Correo'
                    keyboardType='email-address'
                    onChangeText={(texto) => setcorreo(texto)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Ingresar Contraseña'
                    onChangeText={(texto) => setcontrasenia(texto)}
                    secureTextEntry
                />
                <View style={styles.button}>
                    <Button title='Ingresar' onPress={() => login()} />
                </View>
                <View style={styles.button}>
                    <Button title='Registrate' onPress={() => navigation.navigate('Registro')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    box: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 10, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
      },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        alignItems: 'stretch',
    }
})