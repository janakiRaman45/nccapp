import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from './firebase';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker for file selection
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker for date selection

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [registerId, setRegisterId] = useState('');
  const [nccCadetId, setNccCadetId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // State for password
  const [certificate, setCertificate] = useState('No'); // Default value for certificate
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [showDatePicker, setShowDatePicker] = useState(false); // State for showing date picker
  const [showFilePicker, setShowFilePicker] = useState(false); // State for showing file picker
  const navigation = useNavigation();

  // Function to handle showing date picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Function to handle selecting date in date picker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US');
      setDateOfBirth(formattedDate);
    }
  };

  // Function to handle showing file picker
  const handleRadioChange = (value) => {
    setCertificate(value);
    if (value === 'Yes') {
      setShowFilePicker(true);
    } else {
      setShowFilePicker(false);
    }
  };

  // Function to handle file pick
  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (res.type === 'success') {
        setSelectedFile(res);
      }
    } catch (err) {
      console.log('File picker error:', err);
    }
  };

  // Function to handle user registration
  const handleRegister = async () => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password); // Using password for user registration
      Alert.alert('Success', 'User registered successfully.');
      navigation.navigate('Login'); // Navigate to login screen after successful registration
    } catch (error) {
      Alert.alert('Error', 'Failed to register user. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Register ID"
        onChangeText={(text) => setRegisterId(text)}
        value={registerId}
      />
      <TextInput
        style={styles.input}
        placeholder="NCC Cadet ID"
        onChangeText={(text) => setNccCadetId(text)}
        value={nccCadetId}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={showDatepicker}
      >
        <Text>{dateOfBirth || 'Date of Birth'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)} // Handling password input
        value={password}
        secureTextEntry={true}
      />
      <View style={styles.radioContainer}>
        <Text style={styles.radioText}>A certificate Holder?</Text>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity onPress={() => handleRadioChange('Yes')}>
            <View style={[styles.radioButton, certificate === 'Yes' && styles.radioButtonSelected]}></View>
            <Text style={styles.radioButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRadioChange('No')}>
            <View style={[styles.radioButton, certificate === 'No' && styles.radioButtonSelected]}></View>
            <Text style={styles.radioButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showFilePicker && (
        <TouchableOpacity style={styles.input} onPress={handleFilePick}>
          <Text>{selectedFile ? selectedFile.name : 'Upload File'}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioText: {
    marginRight: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align items to the right
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 5,
  },
  radioButtonSelected: {
    backgroundColor: 'blue',
  },
  radioButtonText: {
    fontSize: 16,
    textAlign: 'right',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%', // Adjust button width
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
