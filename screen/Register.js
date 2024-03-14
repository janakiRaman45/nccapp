import React, { createContext, useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    registerId: '',
    nccCadetId: '',
    dateOfBirth: '',
    emailId: '',
    phoneNumber: '',
    selectedFile: null,
    certificate: 'No',
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const Register = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [nameError, setNameError] = useState('');
  const [registerIdError, setRegisterIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nccCadetIdError, setNccCadetIdError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [fileEnabled, setFileEnabled] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US');
      setUserData(prevData => ({
        ...prevData,
        dateOfBirth: formattedDate,
      }));
    }
  };

  const handleInputChange = (key, value) => {
    let nameErr = '';
    let registerIdErr = '';
    let emailErr = '';
    let nccCadetIdErr = '';
    let phoneErr = '';

    if (key === 'name' && /\d/.test(value)) {
      nameErr = 'Name cannot contain numbers';
    }

    if (key === 'registerId') {
      if (!/^[A-Z]\d{2}[A-Z]{3}\d{3}$/.test(value)) {
        registerIdErr = 'Invalid RegisterId Format';
      }
    }

    if (key === 'emailId' && !value.includes('@')) {
      emailErr = 'Email must contain "@" symbol';
    }

    if (key === 'nccCadetId') {
      if (!/^[A-Z]{2}\d{2}[A-Z]{3}\d{6}$/.test(value)) {
        nccCadetIdErr = 'Invalid nccCadetId format';
      }
    }

    if (key === 'phoneNumber') {
      if (!/^\d{10}$/.test(value)) {
        phoneErr = 'Phone number must be exactly 10 digits';
      }
    }

    setNameError(nameErr);
    setRegisterIdError(registerIdErr);
    setEmailError(emailErr);
    setNccCadetIdError(nccCadetIdErr);
    setPhoneError(phoneErr);

    setUserData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleRadioChange = (value) => {
    setUserData(prevData => ({
      ...prevData,
      certificate: value,
    }));
    if (value === 'Yes') {
      setFileEnabled(true);
    } else {
      setFileEnabled(false);
    }
  };

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (res.type === 'success') {
        setUserData(prevData => ({
          ...prevData,
          selectedFile: res,
        }));
      }
    } catch (err) {
      console.log('File picker error:', err);
    }
  };

  const handleRegister = () => {
    if (!userData.name || !userData.emailId || !userData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Registration successful', userData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={[styles.input, nameError && styles.inputError]}
        placeholder="Name"
        value={userData.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <TextInput
        style={[styles.input, registerIdError && styles.inputError]}
        placeholder="registerId (Ex:A11UCA001)"
        value={userData.registerId}
        onChangeText={text => handleInputChange('registerId', text)}
      />
      {registerIdError ? <Text style={styles.errorText}>{registerIdError}</Text> : null}
      <TextInput
        style={[styles.input, nccCadetIdError && styles.inputError]}
        placeholder="nccCadetId (EX:TN21SDA705278)"
        value={userData.nccCadetId}
        onChangeText={text => handleInputChange('nccCadetId', text)}
      />
      {nccCadetIdError ? <Text style={styles.errorText}>{nccCadetIdError}</Text> : null}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{userData.dateOfBirth || 'Date of Birth'}</Text>
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
        style={[styles.input, emailError && styles.inputError]}
        placeholder="emailId"
        value={userData.emailId}
        onChangeText={text => handleInputChange('emailId', text)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={[styles.input, phoneError && styles.inputError]}
        placeholder="phoneNumber"
        value={userData.phoneNumber}
        onChangeText={text => handleInputChange('phoneNumber', text)}
      />
      {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
      <View style={styles.radioContainer}>
        <Text style={styles.radioText}>A certificate Holder?</Text>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity onPress={() => handleRadioChange('Yes')}>
            <Text style={userData.certificate === 'Yes' ? styles.radioButtonSelected : styles.radioButton}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRadioChange('No')}>
            <Text style={userData.certificate === 'No' ? styles.radioButtonSelected : styles.radioButton}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
      {fileEnabled && (
        <TouchableOpacity style={styles.input} onPress={handleFilePick}>
          <Text>{userData.selectedFile ? userData.selectedFile.name : 'Upload File'}</Text>
        </TouchableOpacity>
      )}
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
    justifyContent: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  radioText: {
    flex: 1,
    textAlign: 'left',
  },
  radioButtonContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  radioButtonSelected: {
    borderWidth: 1,
    borderColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default Registration;
