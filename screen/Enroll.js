import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from './firebase';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker for file selection
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

const Enrollment = () => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [classValue, setClassValue] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [branchName, setBranchName] = useState('');
  const [identificationMark, setIdentificationMark] = useState('');
  const [aadharCard, setAadharCard] = useState(null);
  const [bankPassbook, setBankPassbook] = useState(null);
  const [twelfthMarksheet, setTwelfthMarksheet] = useState(null);
  const [tenthMarksheet, setTenthMarksheet] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const navigation = useNavigation();

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-US');
      setDateOfBirth(formattedDate);
    }
  };

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

  const handleEnrollment = () => {
    Alert.alert('Enrolled Submitted');
  }

  // Sample data for FlatList
  const data = [
    { key: '1', label: 'Name', value: name, onChangeText: setName },
    { key: '2', label: "Father's Name", value: fatherName, onChangeText: setFatherName },
    { key: '3', label: "Mother's Name", value: motherName, onChangeText: setMotherName },
    { key: '4', label: 'Class', value: classValue, onChangeText: setClassValue },
    { key: '5', label: 'Aadhar Number', value: aadharNumber, onChangeText: setAadharNumber },
    { key: '6', label: 'Bank Account Number', value: bankAccountNumber, onChangeText: setBankAccountNumber },
    { key: '7', label: 'IFSC Code', value: ifscCode, onChangeText: setIfscCode },
    { key: '8', label: 'Branch Name', value: branchName, onChangeText: setBranchName },
    { key: '9', label: 'Identification Mark', value: identificationMark, onChangeText: setIdentificationMark },
    { key: '10', label: 'Date of Birth', value: dateOfBirth, onPress: showDatepicker },
    { key: '11', label: 'Email', value: email, onChangeText: setEmail },
    { key: '12', label: 'Phone Number', value: phone, onChangeText: setPhone },
    { key: '13', label: 'Password', value: password, onChangeText: setPassword, secureTextEntry: true },
    { key: '14', label: 'Aadhar Card', value: aadharCard ? 'Aadhar Card Uploaded' : 'Upload Aadhar Card', onPress: handleFilePick },
    { key: '15', label: 'Bank Passbook', value: bankPassbook ? 'Bank Passbook Uploaded' : 'Upload Bank Passbook', onPress: handleFilePick },
    { key: '16', label: '12th Marksheet', value: twelfthMarksheet ? '12th Marksheet Uploaded' : 'Upload 12th Marksheet', onPress: handleFilePick },
    { key: '17', label: '10th Marksheet', value: tenthMarksheet ? '10th Marksheet Uploaded' : 'Upload 10th Marksheet', onPress: handleFilePick },
  ];

  return (
    <SafeAreaView style={styles.cont}>
      <View style={styles.container}>
        <Text style={styles.title}>Enrollment</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <View>
              {item.label === 'Date of Birth' ? (
                <TouchableOpacity style={styles.input} onPress={item.onPress}>
                  <Text>{item.value || item.label}</Text>
                </TouchableOpacity>
              ) : item.secureTextEntry ? (
                <TextInput
                  style={styles.input}
                  placeholder={item.label}
                  onChangeText={item.onChangeText}
                  value={item.value}
                  secureTextEntry={true}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  placeholder={item.label}
                  onChangeText={item.onChangeText}
                  value={item.value}
                />
              )}
            </View>
          )}
          keyExtractor={item => item.key}
          style={styles.flatlist}
        />
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleEnrollment}>
          <Text style={styles.buttonText}>Enroll</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 2,
  },
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
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  flatlist: {
    marginTop: 10,
    marginBottom: 20,
    width: '80%',
  },
});

export default Enrollment;