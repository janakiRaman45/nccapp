import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [paradeEvents, setParadeEvents] = useState({});
  const [selectedUniform, setSelectedUniform] = useState('');

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Parade Event', `Year: ${remoteMessage.data.year}\nUniform: ${remoteMessage.data.uniform}`);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Replace this with your logic to fetch parade events from Firebase Realtime Database or Firestore
    // For demo purposes, using dummy data
    const dummyParadeEvents = {
      '2024-03-15': { year: 'Ist Year', uniform: 'Uniform' },
      '2024-03-20': { year: 'IInd Year', uniform: 'Black & White' },
      '2024-03-25': { year: 'IIIrd Year', uniform: 'Uniform' },
    };

    setParadeEvents(dummyParadeEvents);
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const paradeEvent = paradeEvents[day.dateString];
    if (paradeEvent) {
      // Show year and uniform result (optional)
      Alert.alert('Parade Event', `Year: ${paradeEvent.year}\nUniform: ${paradeEvent.uniform}`);
    } else {
      // Push data to Realtime Database
      pushDataToDatabase(day.dateString, selectedUniform);
    }
  };

  const pushDataToDatabase = async (date, uniform) => {
    try {
      const reference = database().ref(`parades/${date}`);
      await reference.set({
        year: 'Custom Year', // Replace with actual year logic
        uniform,
      });
      Alert.alert('Success', 'Parade information submitted!');
    } catch (error) {
      console.error('Error pushing data:', error);
      Alert.alert('Error', 'Failed to submit data.');
    }
  };

  const generateMarkedDates = () => {
    const markedDates = {};
    for (const date in paradeEvents) {
      markedDates[date] = { marked: true };
    }
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.uniformInput}
        placeholder="Enter Uniform"
        onChangeText={setSelectedUniform}
      />
      <Calendar
        style={styles.calendar}
        minDate={new Date().toISOString().split('T')[0]}
        onDayPress={handleDayPress}
        markedDates={generateMarkedDates()}
        markingType={'custom'}
        renderCustomMarker={(date) => (
          <View style={styles.markerContainer}>
            <Text style={styles.marker}>P</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  calendar: {
    width: '90%',
    aspectRatio: 1,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  uniformInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default UserCalendar;
