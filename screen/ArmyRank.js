import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const RankDetails = ({ rank }) => {
  return (
    <View style={styles.rankDetailsContainer}>
      <Text style={styles.rankDetailsText}>{rank.details}</Text>
    </View>
  );
};

const ArmyRanks = () => {
  const [selectedRank, setSelectedRank] = useState(null);

  const ranks = [
    { name: 'General', details: 'General is the highest rank in the army.jjkseksdkjjksdkjsklflksfjsdfj;sdlfbdbdbdbbdbdbdbdbdbbdbdbdbdbddnndnndndndndnn', image: require('../assets/ncclogo.jpg') },
    { name: 'Colonel', details: 'Colonel is a senior officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Major', details: 'Major is a senior officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Captain', details: 'Captain is a mid-level officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Lieutenant', details: 'Lieutenant is a junior officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Sergeant', details: 'Sergeant is a noncommissioned officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Corporal', details: 'Corporal is a noncommissioned officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Private', details: 'Private is the lowest rank in the army.', image: require('../assets/ncclogo.jpg') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Army Ranks</Text>
      {ranks.map((rank, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedRank(rank)}
          style={styles.rankButton}
        >
          <ImageBackground
            source={rank.image}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.rankButtonText}>{rank.name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      ))}
      {selectedRank && <RankDetails rank={selectedRank} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rankButton: {
    margin: 5,
  },
  imageBackground: {
    width: 150, // Adjust as per your image size
    height: 150, // Adjust as per your image size
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 5,
    overflow: 'hidden', // Ensure image is properly rounded
  },
  rankButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    padding: 10,
  },
  rankDetailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  rankDetailsText: {
    fontSize: 16,
  },
});

export default ArmyRanks;
