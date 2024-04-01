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

const NavyRank = () => {
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
    { name: 'Admiral', details: 'Admiral is a four-star naval flag officer rank in the Indian Navy. It is the highest active rank in the Indian Navy.', image: require('../assets/Navy/Admiral.png') },
    { name: 'Vice Admiral', details: 'Vice admiral is a three-star flag officer rank in the Indian Navy. It is the second-highest active rank in the Indian Navy. Vice admiral ranks above the two-star rank of rear admiral and below the four-star rank of admiral.', image: require('../assets/Navy/Vice Admiral.png') },
    { name: 'Rear Admiral', details: ' Rear Admiral is a two-star flag officer rank in the Indian Navy. It is the third-highest active rank in the Indian Navy. Rear admiral ranks above the one-star rank of commodore and below the three-star rank of vice admiral.', image: require('../assets/Navy/Rear Admiral.png') },
    { name: 'Commodore', details: 'Officers in the rank of commodore serve as commanding officers of shore establishments like INS Hansa, INS Shivaji, etc. Commodores also fill appointments of naval officer-in-charge (NOIC) of naval areas.', image: require('../assets/Navy/Commadore.png') },
    { name: 'Captain', details: 'Captain: Equivalent to “Colonel” in the Indian Army and “Group Captain” in the Indian Air Force. Plays a crucial role in commanding naval vessels and ensuring operational efficiency.', image: require('../assets/Navy/Captain.png') },
    { name: 'Commander', details: 'While the President of India serves as the Supreme Commander of the Indian Armed Forces, the organisational structure of the Indian Navy is headed by the Chief of Naval Staff (CNS), who holds the rank of Admiral.', image: require('../assets/Navy/Commander.png') },
    { name: 'Lietuentent Commander', details: 'Equivalent to “Major” in the Indian Army and “Squadron Leader” in the Indian Air Force. Assumes a key leadership role with responsibilities aligned with their rank.', image: require('../assets/Navy/Lietuentent Commander.png') },
    { name: 'Lietuentent', details: 'Lieutenant: Equivalent to “Captain” in the Indian Army and “Flight Lieutenant” in the Indian Air Force. Holds a crucial position in the naval hierarchy with distinct responsibilities.', image: require('../assets/Navy/Lietuentent.png') },
    { name: 'Sub Lietuentent', details: 'Sub Lieutenant: A sub-lieutenant is the junior-most officer in the navigation team and is responsible for the safety of the ship. The sub-lieutenant reads navigational charts and looks after shipping traffic. Lieutenant: A lieutenants primary responsibilities can vary.', image: require('../assets/Navy/Sub Lietuentent.png') },
    { name: 'Mid ship man', details: 'Midshipman: Entry-level rank for officer cadets, symbolizing the beginning of their naval career. Represents a stage of learning and training as they progress within the naval ranks.', image: require('../assets/Navy/Mid ship man.png') },
    { name: 'Master Chief petty officer I', details: 'The Navy Master Chief Petty Officer (Navy MCPO) is a unique non-commissioned position of office of the Indian Navy. The holder of this position is the most senior rating of the Indian Navy, equivalent to the Indian Air Force Master Warrant Officer.', image: require('../assets/Navy/Master Chief petty officer I.png') },
    { name: 'Master Chief petty officer II', details: 'The master chief petty officer of the Navy is appointed by the chief of naval operations to serve as a spokesperson to address the issues of enlisted personnel to the highest positions in the Navy.', image: require('../assets/Navy/Master Chief petty officer II.png') },
    { name: 'Chief petty officer', details: 'Since 1950, the designation of Chief Petty Officer was the highest non-commissioned rank in rank hierarchy until December 1968, when the designations of Master Chief Petty Officer I and Master Chief Petty Officer II were introduced.', image: require('../assets/Navy/Chief petty officer.png') },
    { name: 'Petty Officer', details: 'Multiple sources indicated that the seven ranks of the PBOR cadre, namely, Master Chief Petty Officer Ist Class, Master Chief Petty Officer IInd Class, Chief Petty Officer, Petty Officer, Leading Seaman, Seaman Ist Class and Seaman IInd Class.', image: require('../assets/Navy/Petty Officer.png') },
    { name: 'Leading Seaman', details: 'A Leading Seaman in the Indian Navy holds a significant position within the non-commissioned officer ranks. This rank denotes a seasoned and experienced sailor who has demonstrated leadership and expertise in various maritime duties.', image: require('../assets/Navy/Leading Seaman.png') },
    
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
      <Text style={styles.header}>NavyRank Ranks</Text>
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

export default NavyRank;
