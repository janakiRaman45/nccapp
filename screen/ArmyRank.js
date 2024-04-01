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
    { name: 'Field Marshal', details: 'Awarded exclusively in recognition of exceptional service and leadership during wartime,Ceremonial not included in Army organizational hierarchy.', image: require('../assets/army/Field Marshal.png') },
    { name: 'General', details: 'Highest ranking flag rank/active-duty officer in Army organizational hierarchy.', image: require('../assets/army/General.png') },
    { name: 'Lieutenant General', details: 'Second-highest flag rank in Army organizational hierarchy..', image: require('../assets/army/Lieutenant General.png') },
    { name: 'Major General', details: 'Third-highest flag rank in Army organizational hierarchy..', image: require('../assets/army/Major General.png') },
    { name: 'Brigadier', details: 'Fourth-highest flag rank in Army organizational hierarchy.', image: require('../assets/army/Brigadier.png') },
    { name: 'Colonel', details: 'It is equivalent to captain in the Indian Navy and group captain in the Indian Air Force.', image: require('../assets/army/Colonel.png') },
    { name: 'Lieutenant Colonel', details: 'Lieutenant colonel is a rank of commissioned officers in the armies, most marine forces and some air forces of the world, above a major and below a colonel.', image: require('../assets/army/Lieutenant Colonel.png') },
    { name: 'Major', details: 'When used unhyphenated and in conjunction with no other indicators, major is one rank above captain in armies and air forces, and one rank below lieutenant colonel.', image: require('../assets/army/Major.png') },
    { name: 'Captain', details: 'Captain is a mid-level officer rank.', image: require('../assets/army/Captain.png') },
    { name: 'Lieutenant', details: 'Lieutenant is a junior officer rank.', image: require('../assets/army/Lieutenant.png') },
    { name: 'Second Lieutenant', details: 'They lead platoon-size units consisting of a platoon sergeant and two or more squads (16 to 44 Soldiers).', image: require('../assets/army/Second Lieutenant.png') },
    { name: 'Subedar Major', details: 'They possess a high amount of experience and are referred to as SM Sahab. An SM can lead a single unit or a headquarters that has troops under its command.', image: require('../assets/army/Subedar Major.png') },
    { name: 'Subedar', details: 'Subedar is a military rank in the militaries of South Asia roughly equivalent to that of a warrant officer. Historically classes in the British Indian Army as a Viceroys commissioned officer.', image: require('../assets/army/Subedar.png') },
    { name: 'Naib Subedar', details: 'This is the lowest rank for Junior Commissioned Officers in the Indian army rank structure. Candidates are promoted to this rank by selection.', image: require('../assets/army/Naib_Subedar.png') },
   // { name: 'Regimental Havildar Major', details: 'The insignia was an Ashoka lion emblem. The regimental quartermaster havildar the most senior non-commissioned officer in a company, equivalent to a company sergeant major.', image: require('../assets/Regimental Havildar Major.png') },
   // { name: 'Regimental Quartermaster Havildar', details: 'The regimental quartermaster havildar (RQMH) was equivalent to a regimental quartermaster sergeant. The regimental havildar major (RHM) was equivalent to a regimental sergeant major.', image: require('../assets/Regimental Quartermaster Havildar.png') },
   // { name: 'Company Havildar Master', details: 'The company havildar master assisted the quartermaster in managing the company stores. The insignia was three chevrons with an Ashoka lion emblem above.', image: require('../assets/CHM.png') },
    //{ name: 'Company Quater Havildar Master', details: 'The company quartermaster havildar (CQMH), equivalent to a company quartermaster sergeant, assisted the quartermaster in managing the company stores.', image: require('../assets/CQHM.jng') },
    { name: 'Havildar', details: 'Havildar is a rank in the Indian, Pakistani and Nepalese armies, equivalent to sergeant. It is not used in cavalry units, where the equivalent is daffadar.', image: require('../assets/army/Havildar.png') },
    { name: 'Naik', details: 'Naik is an Indian Army, Pakistan Army and Bangladesh Police rank equivalent to corporal. The rank was previously used in the Indian Army during the Raj and the Camel Corps, ranking between lance naik and havildar.', image: require('../assets/army/Naik.png') },
    { name: 'Lance Naik', details: 'A Lance Naik is a crucial rank in the Indian Army, typically held by a non-commissioned officer (NCO). They serve as a bridge between the lower enlisted soldiers.', image: require('../assets/army/Lance Naik.png') },
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
    height: '50%', 
  },
  imageContainer: {
    width: windowWidth / 2 - 20, 
    height: windowWidth / 2 - 20,
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
