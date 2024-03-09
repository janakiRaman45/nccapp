import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [paradeEvents, setParadeEvents] = useState({});

  // Dummy parade events (replace with actual data)
  const dummyParadeEvents = {
    '2024-03-15': { year: 'Ist Year', uniform: 'Uniform' },
    '2024-03-20': { year: 'IInd Year', uniform: 'Black & White' },
    '2024-03-25': { year: 'IIIrd Year', uniform: 'Uniform' },
  };

  useEffect(() => {
    // Update parade events
    setParadeEvents(dummyParadeEvents);
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const paradeEvent = paradeEvents[day.dateString];
    if (paradeEvent) {
      // Show year and uniform result
      Alert.alert('Parade Event', `Year: ${paradeEvent.year}\nUniform: ${paradeEvent.uniform}`);
    }
  };

  // Function to generate marked dates for parade events
  const generateMarkedDates = () => {
    const markedDates = {};
    for (const date in paradeEvents) {
      markedDates[date] = { marked: true };
    }
    return markedDates;
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        minDate={new Date().toISOString().split('T')[0]} // Set minDate to today's date
        onDayPress={handleDayPress}
        markedDates={generateMarkedDates()} // Pass marked dates here
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
