import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const UserCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [paradeEvents, setParadeEvents] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  // Dummy data for parade events
  const dummyParadeEvents = {
    '2024-04-15': { year: 'Ist Year', uniform: 'Uniform' },
    '2024-04-20': { year: 'IInd Year', uniform: 'Black & White' },
    '2024-04-25': { year: 'IIIrd Year', uniform: 'Uniform' },
    '2024-04-30': { year: 'IVth Year', uniform: 'Casual' },
    '2024-04-05': { year: 'Vth Year', uniform: 'Formal' },
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const paradeEvent = paradeEvents[day.dateString];
    if (paradeEvent) {
      Alert.alert('Parade Event', `Year: ${paradeEvent.year}\nUniform: ${paradeEvent.uniform}`);
    }
  };

  const pushDataToState = (date, uniform) => {
    const customYear = 'Custom Year'; // Replace with actual logic to determine year
    const newEvent = { year: customYear, uniform };

    setParadeEvents((prevEvents) => ({
      ...prevEvents,
      [date]: newEvent,
    }));
    setMarkedDates((prevDates) => ({
      ...prevDates,
      [date]: { marked: true },
    }));
    Alert.alert('Success', 'Parade information submitted!');
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        minDate={new Date().toISOString().split('T')[0]}
        onDayPress={handleDayPress}
        markedDates={markedDates}
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
