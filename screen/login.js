import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserCalendar from './aCallender';
import PdfList from './pdf';


const Login = () => {
    const navigation = useNavigation();

    const [nccCadetId, setNccCadetId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      if (nccCadetId == 'Admin' && password == '12345' )
      {
      navigation.navigate('HomeScreen');
      }
    };

    const handleRegister = () => {
        navigation.navigate('Registration');
    };

    const handleGuest = () => {
        console.log('Logging in as a guest...');
        navigation.navigate('PdfList');
    }; 

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/ncclogo.jpg')} // left image
                    style={styles.image}
                />
                <Text style={styles.title}>SKC - NCC</Text>
                <Image
                    source={require('../assets/ncclogo.jpg')} // right image
                    style={styles.image}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="NCC Cadet ID"
                value={nccCadetId}
                onChangeText={text => setNccCadetId(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.guestButton} onPress={handleGuest}>
                <Text style={styles.buttonText}>Guest</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC', // Light brown background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10, 
    marginBottom: 10,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#F23010', // Dark Blue
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#0023F5', // light blue
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  guestButton: {
    width: '80%',
    backgroundColor: '#22BEF5', // red
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
