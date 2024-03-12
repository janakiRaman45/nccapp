import React, { createContext, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    registerId: '',
    nccCadetId: '',
    dateOfBirth: '',
    emailId: '',
    phoneNumber: '',
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const Register = () => {
  const { userData, setUserData } = useContext(UserContext);

  const handleInputChange = (key, value) => {
    setUserData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleRegister = () => {
    console.log('Registration successful', userData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={userData.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="registerId"
        value={userData.registerId}
        onChangeText={text => handleInputChange('registerId', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="nccCadetId"
        value={userData.nccCadetId}
        onChangeText={text => handleInputChange('nccCadetId', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="dateOfBirth"
        value={userData.dateOfBirth}
        onChangeText={text => handleInputChange('dateOfBirth', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="emailId"
        value={userData.emailId}
        onChangeText={text => handleInputChange('emailId', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="phoneNumber"
        value={userData.phoneNumber}
        onChangeText={text => handleInputChange('phoneNumber', text)}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const Registration = () => {
  return (
    <UserProvider>
      <Register />
    </UserProvider>
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

export default Registration;
