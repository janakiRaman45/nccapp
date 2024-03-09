import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArmyRankGallery = () => {
  const navigation = useNavigation();

  // Example rank data, replace these with your actual rank data
  const ranks = [
    { id: 1, name: 'General', image: require('../assets/ncclogo.jpg'), description: 'Description for General rank.' },
    { id: 2, name: 'Colonel', image: require('../assets/ncclogo.jpg'), description: 'Description for Colonel rank.' },
    { id: 3, name: 'Major', image: require('../assets/ncclogo.jpg'), description: 'Description for Major rank.' },
    { id: 4, name: 'Captain', image: require('../assets/ncclogo.jpg'), description: 'Description for Captain rank.' },
    { id: 5, name: 'Lieutenant', image: require('../assets/ncclogo.jpg'), description: 'Description for Lieutenant rank.' },
    { id: 6, name: 'Sergeant', image: require('../assets/ncclogo.jpg'), description: 'Description for Sergeant rank.' },
    // Add more rank data as needed
    // Add your remaining 11 rank images here
  ];

  const handleRankPress = (rank) => {
    // Navigate to the page displaying information about the specific rank
    navigation.navigate('RankDetails', { rank });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {ranks.map((rank) => (
        <TouchableOpacity key={rank.id} onPress={() => handleRankPress(rank)}>
          <Image
            source={rank.image}
            style={styles.rankImage}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  rankImage: {
    width: 100, // Adjust the width of the rank images as needed
    height: 100, // Adjust the height of the rank images as needed
    margin: 5, // Adjust the margin between rank images as needed
  },
});

export default ArmyRankGallery;
