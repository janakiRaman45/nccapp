import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const GridCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedUniforms, setSelectedUniforms] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleYearToggle = (year) => {
    setSelectedYears((prevYears) =>
      prevYears.includes(year)
        ? prevYears.filter((selectedYear) => selectedYear !== year)
        : [...prevYears, year]
    );
  };

  const handleUniformToggle = (uniform) => {
    setSelectedUniforms((prevUniforms) =>
      prevUniforms.includes(uniform)
        ? prevUniforms.filter((selectedUniform) => selectedUniform !== uniform)
        : [...prevUniforms, uniform]
    );
  };

  const handleSubmit = () => {
    if (selectedYears.length === 0 || selectedUniforms.length === 0) {
      Alert.alert('Error', 'Please select atleast one year and one dress code.');
      return;
    }

    console.log('Selected Date:', selectedDate);
    console.log('Selected Years:', selectedYears);
    console.log('Selected Uniforms:', selectedUniforms);
    // Perform submit action here
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        style={styles.calendar}
        minDate={new Date().toISOString().split('T')[0]} // Set minDate to today's date
      />
      {selectedDate && (
        <View style={styles.selectionContainer}>
          <Text>Date: {selectedDate}</Text>
          <Text style={styles.title}>Years:</Text>
          <View style={styles.optionsContainer}>
            <Button
              title="Ist Year"
              onPress={() => handleYearToggle('Ist Year')}
              color={selectedYears.includes('Ist Year') ? 'green' : 'red'}
            />
            <Button
              title="IInd Year"
              onPress={() => handleYearToggle('IInd Year')}
              color={selectedYears.includes('IInd Year') ? 'green' : 'red'}
            />
            <Button
              title="IIIrd Year"
              onPress={() => handleYearToggle('IIIrd Year')}
              color={selectedYears.includes('IIIrd Year') ? 'green' : 'red'}
            />
          </View>
          <Text style={styles.title}>Dress Code:</Text>
          <View style={styles.optionsContainer}>
            <Button
              title="Uniform"
              onPress={() => handleUniformToggle('Uniform')}
              color={selectedUniforms.includes('Uniform') ? 'green' : 'red'}
            />
            <Button
              title="Black & White"
              onPress={() => handleUniformToggle('Black & White')}
              color={selectedUniforms.includes('Black & White') ? 'green' : 'red'}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      )}
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
  selectionContainer: {
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default GridCalendar;
