import { Alert, Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, storage } from '../config/config';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';

export default function RegistroScreen({ navigation }: any) {

  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")
  const [image, setImage] = useState("");


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3.5, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function subir() {
    const storageRef = ref(storage, 'usuarios/');
    const response = await fetch(image);
    const blob = await response.blob();

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Subido!');
    });
  }

  function registro() {

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        Alert.alert("Mensaje", "Registro Exitoso")
        navigation.navigate('Tabs');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        // ..
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder='Ingresar Correo'
          keyboardType='email-address'
          onChangeText={(texto) => setcorreo(texto)}
        />
        <TextInput
          style={styles.input}
          placeholder='Ingresar Contraseña'
          secureTextEntry
          onChangeText={(texto) => setcontrasenia(texto)}
        />
        <Button title='Ingresar' onPress={() => registro()} />
        <View style={styles.button}>
          <Button title="Sube una imagen" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Button title='Subir' onPress={() => subir()} />
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
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignItems: 'stretch',
  }
})