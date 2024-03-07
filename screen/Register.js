import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [name, setName] = useState('');
  const [registerId, setRegisterId] = useState('');
  const [nccCadetId, setNccCadetId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    if (name && registerId && nccCadetId && dateOfBirth && emailId && phoneNumber) {
      // Handle registration logic here
      console.log('Registration successful');
      navigation.navigate('HomeScreen');
    } else {
      console.log('Please fill in all fields');
      // Provide feedback to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Register ID"
        value={registerId}
        onChangeText={text => setRegisterId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="NCC Cadet ID"
        value={nccCadetId}
        onChangeText={text => setNccCadetId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={text => setDateOfBirth(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email ID"
        value={emailId}
        onChangeText={text => setEmailId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#4682B4',
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

export default Register;
