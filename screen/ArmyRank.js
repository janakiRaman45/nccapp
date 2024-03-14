import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, LayoutAnimation, UIManager, Platform, FlatList } from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RankDetails = ({ rank }) => {
  return (
    <View style={styles.rankDetailsContainer}>
      <Text style={styles.rankDetailsText}>{rank.details}</Text>
    </View>
  );
};

const ArmyRanks = () => {
  const [selectedRank, setSelectedRank] = useState(null);

  const toggleRank = (rank) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedRank && selectedRank.name === rank.name) {
      setSelectedRank(null);
    } else {
      setSelectedRank(rank);
    }
  };

  const ranks = [
    { name: 'General', details: 'General is the highest rank in the army.', image: require('../assets/ncclogo.jpg') },
    { name: 'Colonel', details: 'Captain of Indian Army.', image: require('../assets/Captain_of_the_Indian_Army.png') },
    { name: 'Major', details: 'Second Lieutenant of Indian Army.', image: require('../assets/Second_Lieutenant_of_the_Indian_Army.png') },
    { name: 'Captain', details: 'Captain is a mid-level officer rank.', image: require('../assets/Subedar_-_Risaldar_of_the_Indian_Army.png') },
    { name: 'Lieutenant', details: 'Lieutenant is a junior officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Sergeant', details: 'Sergeant is a noncommissioned officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Corporal', details: 'Corporal is a noncommissioned officer rank.', image: require('../assets/ncclogo.jpg') },
    { name: 'Private', details: 'Private is the lowest rank in the army.', image: require('../assets/ncclogo.jpg') },
  ];

  const renderRankItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleRank(item)}
      style={styles.rankButton}
    >
      <View style={styles.imageContainer}>
        <ImageBackground
          source={item.image}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
          resizeMode="cover" // Adjust resizeMode here
        >
          <Text style={styles.rankButtonText}>{item.name}</Text>
        </ImageBackground>
      </View>
      {selectedRank && selectedRank.name === item.name && <RankDetails rank={selectedRank} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Army Ranks</Text>
      <FlatList
        data={ranks}
        renderItem={renderRankItem}
        keyExtractor={(item) => item.name}
        numColumns={2} // Adjust according to your preference
        contentContainerStyle={styles.rankList}
      />
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
    alignItems: 'center',
  },
  imageContainer: {
    width: 150, // Adjust according to your preference
    height: 150, // Adjust according to your preference
    overflow: 'hidden',
    borderRadius: 5,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 1,
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
  rankList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default ArmyRanks;
