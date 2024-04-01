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

const Airforce = () => {
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
    { name: 'Marshal of the Air Force', details: 'Marshal of the Air Force is a five star rank and the highest attainable rank in the Indian Air Force. Marshal of the Air Force is ranked immediately above Air Chief Marshal. It is a ceremonial or wartime rank, having been awarded only once. Marshal of the Air Force Arjan Singh, DFC is the only Officer to have held this rank.', image: require('../assets/Airforce/Marshal of the Air Force.png') },
    { name: 'Air chief marshal', details: 'The Indian Air Force inherited the rank of air chief marshal from the RAF. While the RAF air officers in command of RAF India were normally of a lower rank, Sir Edgar Ludlow-Hewitt was promoted to the rank in 1937, towards the end of his tenure as Air Officer Commanding RAF India.', image: require('../assets/Airforce/Air chief marshal.png') },
    { name: 'Air marshal', details: 'From 1947 to 1966, the appointment of Chief of the Air Staff, the professional head of the Indian Air Force was held by an air marshal. The position of the CAS was upgraded from air marshal to air chief marshal in 1966. The first IAF officer to hold the rank was ACM Arjan Singh.', image: require('../assets/Airforce/Air marshal.png') },
    { name: 'Air vice marshal', details: 'Air Officer Commanding advance HQs of the air commands. At air headquarters, air vice marshals hold the appointments of assistant chief of air staff in different staff branches and those of additional director general.', image: require('../assets/Airforce/Air vice marshal.png') },
    { name: 'Air Commodore', details: 'Officers in the rank of air commodore command air force stations and are titled air officer commanding (AOC). In staff appointments, they serve as Air-I at command headquarters.', image: require('../assets/Airforce/Air Commodore.png') },
    { name: 'Group Captain', details: 'On 06 March 1946, Subroto Mukerjee was promoted to the acting rank of Group Captain, the first Indian officer to be promoted to the rank. He was appointed Group Captain (Plans & Training) at Air headquarters.', image: require('../assets/Airforce/Group Captain.png') },
    { name: 'Wing commander', details: 'On 1 April 1918, the newly created RAF adopted its officer rank titles from the British Army, with Royal Naval Air Service captains and Royal Flying Corps colonels officially becoming colonels in the RAF.', image: require('../assets/Airforce/Wing commander.png') },
    { name: 'Squadron leader', details: 'Squadron leader is immediately senior to flight lieutenant and immediately below wing commander. It is usually equivalent to the rank of lieutenant commander in the navy and of the rank of major in other services.', image: require('../assets/Airforce/Squadron leader.png') },
    { name: 'Flight lieutenant', details: 'The rank originated in the Royal Naval Air Service (RNAS) in 1914. It fell into abeyance when the RNAS merged with the Royal Flying Corps during the First World War but was revived in 1919 in the post-war RAF.', image: require('../assets/Airforce/Flight lieutenant.png') },
    { name: 'Flying officer', details: 'Flying officer is immediately senior to pilot officer and immediately below flight lieutenant. It is usually equivalent to the rank of sub-lieutenant in the navy and of the rank of lieutenant in other services.The equivalent rank in the Womens Auxiliary Air Force was "section officer.', image: require('../assets/Airforce/Flying officer.png') },
    { name: 'Flight cadet', details: 'A flight cadet is a military or civilian occupational title that is held by someone who is in training to perform aircrew duties in an airplane. The trainee does not need to become a pilot.', image: require('../assets/Airforce/Flight cadet.png') },
    { name: 'Master warrant officer', details: 'Master warrant officer is an Army and Air Force non-commissioned member rank of the Canadian Forces. It is senior to the rank of warrant officer and its equivalents, and junior to chief warrant officer and its equivalents. Its Naval equivalent is chief petty officer 2nd class.', image: require('../assets/Airforce/Master warrant officer.png') },
    { name: 'Warrant officer', details: 'Other warrant officers included surgeons mates, boatswains mates and carpenters mates, sailmakers, armourers, schoolmasters (involved in the education of boys, midshipmen and others aboard ship) and clerks.', image: require('../assets/Airforce/Warrant officer.png') },
    { name: 'Junior warrant officer', details: 'Junior commissioned officers are the Indian Armed Forces equivalent of warrant officer ranks. Those in the Indian Air Force actually use the ranks of junior warrant officer, warrant officer and master warrant officer.', image: require('../assets/Airforce/Junior warrant officer.png') },
    { name: 'Sergeant', details: 'In the Indian Air Force, the rank of Sergeant is the highest Non-Commissioned Officer rank, ranking above a Corporal, and below a Junior Warrant Officer.', image: require('../assets/Airforce/Sergeant.png') },
    { name: 'Corporal', details: 'In the Indian Air Force, a corporal is a rank given to an airman who is senior to leading aircraftman but junior to a sergeant. A corporal is designated as a Non-Commissioned Officer in the Indian Air Force.', image: require('../assets/Airforce/Corporal.png') },
    { name: 'Leading aircraftman', details: 'Leading aircraftman or leading aircraftwoman is an enlisted rank used by some air forces, with origins from the Royal Air Force. The rank is used by air forces of many countries that have historical British influence.', image: require('../assets/Airforce/Leading aircraftman.png') },
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

export default Airforce;
