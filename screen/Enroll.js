import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

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

  const handleFilePick = async (key) => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (res.type === 'success') {
        const { uri, size } = res;
        const fileData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const fileName = uri.split('/').pop();
        const fileType = res.mimeType;
        const fileSize = size; // Get the file size in bytes

        // Set the file based on the key
        switch (key) {
          case '14': // Aadhar Card
            setAadharCard({ fileName, fileData, fileType, fileSize });
            break;
          case '15': // Bank Passbook
            setBankPassbook({ fileName, fileData, fileType, fileSize });
            break;
          case '16': // 12th Marksheet
            setTwelfthMarksheet({ fileName, fileData, fileType, fileSize });
            break;
          case '17': // 10th Marksheet
            setTenthMarksheet({ fileName, fileData, fileType, fileSize });
            break;
          default:
            break;
        }
      } else if (res.type === 'cancel') {
        console.log('File picking canceled');
      }
    } catch (err) {
      console.error('File picker error:', err);
      Alert.alert('Error', 'Failed to pick file. Please try again.');
    }
  };

  const handleEnrollment = async () => {
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('fatherName', fatherName);
      formData.append('motherName', motherName);
      formData.append('classValue', classValue);
      formData.append('aadharNumber', aadharNumber);
      formData.append('bankAccountNumber', bankAccountNumber);
      formData.append('ifscCode', ifscCode);
      formData.append('branchName', branchName);
      formData.append('identificationMark', identificationMark);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);

      // Append file data to the form data
      if (aadharCard) {
        formData.append('aadharCard', aadharCard.fileData, aadharCard.fileName);
      }
      if (bankPassbook) {
        formData.append('bankPassbook', bankPassbook.fileData, bankPassbook.fileName);
      }
      if (twelfthMarksheet) {
        formData.append('twelfthMarksheet', twelfthMarksheet.fileData, twelfthMarksheet.fileName);
      }
      if (tenthMarksheet) {
        formData.append('tenthMarksheet', tenthMarksheet.fileData, tenthMarksheet.fileName);
      }

      // Send the form data to your backend server
      const response = await fetch('/your-backend-endpoint', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        Alert.alert('Enrollment Submitted');
        // Reset form fields or navigate to another screen
      } else {
        Alert.alert('Error submitting enrollment');
      }
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      Alert.alert('Error submitting enrollment');
    }
  };

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
    {
      key: '14',
      label: 'Aadhar Card',
      value: aadharCard
        ? `${aadharCard.fileName} (${(aadharCard.fileSize / 1024).toFixed(2)} KB)`
        : 'Upload Aadhar Card',
      onPress: () => handleFilePick('14'),
    },
    {
      key: '15',
      label: 'Bank Passbook',
      value: bankPassbook
        ? `${bankPassbook.fileName} (${(bankPassbook.fileSize / 1024).toFixed(2)} KB)`
        : 'Upload Bank Passbook',
      onPress: () => handleFilePick('15'),
    },
    {
      key: '16',
      label: '12th Marksheet',
      value: twelfthMarksheet
        ? `${twelfthMarksheet.fileName} (${(twelfthMarksheet.fileSize / 1024).toFixed(2)} KB)`
        : 'Upload 12th Marksheet',
      onPress: () => handleFilePick('16'),
    },
    {
      key: '17',
      label: '10th Marksheet',
      value: tenthMarksheet
        ? `${tenthMarksheet.fileName} (${(tenthMarksheet.fileSize / 1024).toFixed(2)} KB)`
        : 'Upload 10th Marksheet',
      onPress: () => handleFilePick('17'),
    },
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
