import React from 'react';
import { View, ScrollView, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ArmyRankGallery = () => {
  const navigation = useNavigation();

  const handleBranchPress = (Army) => {
    navigation.navigate('ArmyRanks', { Army });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => handleBranchPress('Army')} style={styles.branchButton}>
        <ImageBackground
          source={require('../assets/army.jpg')}
          style={styles.imageBackground}
          imageStyle={styles.branchButtonImage}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Army</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBranchPress('Navy')} style={styles.branchButton}>
        <ImageBackground
          source={require('../assets/navy.jpg')}
          style={styles.imageBackground}
          imageStyle={styles.branchButtonImage}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Navy</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBranchPress('Airforce')} style={styles.branchButton}>
        <ImageBackground
          source={require('../assets/Airforce.jpg')}
          style={styles.imageBackground}
          imageStyle={styles.branchButtonImage}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Airforce</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
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
  branchButton: {
    width: wp(80),
    height: hp(30),
    justifyContent: 'flex-end',
    margin: 5,
  },
  imageBackground: {
    flex: 1,
  },
  branchButtonImage: {
    borderRadius: 15,
    opacity: 0.8,
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
});

export default ArmyRankGallery;
