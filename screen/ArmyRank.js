import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, LayoutAnimation, UIManager, Platform, FlatList, Dimensions, Modal, ScrollView } from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const RankDetails = ({ rank, onClose }) => {
  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <ScrollView>
            <ImageBackground
              source={rank.image}
              style={styles.modalImage}
              resizeMode="contain"
            >
              <Text style={styles.rankName}>{rank.name}</Text>
            </ImageBackground>
            <View style={styles.rankDetailsContainer}>
              <Text style={styles.rankDetailsText}>{rank.details}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const ArmyRanks = () => {
  const [selectedRank, setSelectedRank] = useState(null);
  const [numColumns, setNumColumns] = useState(2); // Initial number of columns

  const toggleRank = (rank) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedRank(rank);
  };

  const onCloseModal = () => {
    setSelectedRank(null);
  };

  const ranks = [
    { name: 'General', details: 'General is the highest rank in the army.', image: require('../assets/ncclogo.jpg') },
    { name: 'Colonel', details: 'Captain of Indian Army."The Indian Army, with its timeless motto Service Before Self, embodies the spirit of sacrifice, valor, and dedication. This motto encapsulates the unwavering commitment of the Indian soldier to serve the nation with utmost devotion and integrity. It reflects the ethos of putting the welfare of the country and its people above personal interests, symbolizing the noble virtues upheld by the brave men and women in uniform. With courage as their armor and patriotism as their creed, the Indian Army stands as a beacon of strength, safeguarding the sovereignty and integrity of the nation, while also extending a helping hand in times of need, both at home and abroad. In every challenge they face and every mission they undertake, the soldiers of the Indian Army remain steadfast in their resolve, exemplifying the epitome of selfless service and unwavering dedication to the nation.', image: require('../assets/Captain_of_the_Indian_Army.png') },
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Army Ranks</Text>
      <FlatList
        data={ranks}
        renderItem={renderRankItem}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        contentContainerStyle={styles.rankList}
        key={numColumns} // Ensure a fresh render when numColumns changes
      />
      {selectedRank && <RankDetails rank={selectedRank} onClose={onCloseModal} />}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

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
    height: '40%', // Increase the height here
  },
  imageContainer: {
    width: windowWidth / 2 - 20, // Adjust according to your preference
    height: windowWidth / 2 - 20, // Adjust according to your preference
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
    overflow: 'hidden', 
  },
  rankButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: windowWidth - 40,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  rankName: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
  rankDetailsContainer: {
    marginTop: 10,
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
