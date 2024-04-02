import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from 'react-native';

const lyricsData = [
  { id: '1', text: 'Hum Sab Bharatiya Hain', tamilMeaning: 'நாம் அனைவரும் இந்தியர்கள்,' },
  { id: '2', text: 'Hum Sab Bharatiya Hain', tamilMeaning: 'நாம் அனைவரும் இந்தியர்கள்,' },
  { id: '3', text: 'Hum Sab Bharatiya Hain', tamilMeaning: 'நாம் அனைவரும் இந்தியர்கள்,' },
  { id: '4', text: 'Hum Sab Bharatiya Hain', tamilMeaning: 'நாம் அனைவரும் இந்தியர்கள்,' },
  { id: '5', text: 'Apni Manzil Ek Hai', tamilMeaning: 'உங்கள் இலக்கு ஒன்று,' },
  { id: '6', text: 'Ha, Ha, Ha, Ek Hai', tamilMeaning: 'ஹா, ஹா, ஹா, ஒன்று,' },
  { id: '7', text: 'Ho, Ho, Ho, Ek Hai.', tamilMeaning: 'ஹோ, ஹோ, ஹோ, ஒன்று.' },
  { id: '8', text: 'Hum Sab Bharatiya Hain.', tamilMeaning: 'நாம் அனைவரும் இந்தியர்கள்.' },
  { id: '9', text: 'Hum Sab Bharatiya Hain.', tamilMeaning: 'நாம் அனைவரும் இந்தியர்கள்.' },
  { id: '10', text: '' },
  { id: '11', text: 'Kashmir Ki Dharti Rani Hai', tamilMeaning: 'காஷ்மீர் நிலம் ராணி.' },
  { id: '12', text: 'Sartaj Himalaya Hai', tamilMeaning: 'சர்தாஜ் என்பது இமயமலை,' },
  { id: '13', text: 'Sadiyon Se Hamne Isko Apne', tamilMeaning: 'நாம் அதை பல நூற்றாண்டுகளாக பயன்படுத்தி வருகிறோம்.' },
  { id: '14', text: 'Khoon Se Pala Hai', tamilMeaning: 'குருதியால் வளர்க்கப்பட்டவர்.' },
  { id: '15', text: 'Kashmir Ki Dharti Rani Hai', tamilMeaning: 'காஷ்மீர் நிலம் ராணி.' },
  { id: '16', text: 'Sartaj Himalaya Hai', tamilMeaning: 'சர்தாஜ் என்பது இமயமலை,' },
  { id: '17', text: 'Sadiyon Se Hamne Isko Apne', tamilMeaning: 'நாம் அதை பல நூற்றாண்டுகளாக பயன்படுத்தி வருகிறோம்.' },
  { id: '18', text: 'Khoon Se Pala Hai', tamilMeaning: 'குருதியால் வளர்க்கப்பட்டவர்.' },
  { id: '19', text: '' },
  { id: '20', text: 'Desh Ki Raksha Ki Khatir', tamilMeaning: 'நாட்டைப் பாதுகாப்பதற்காக.' },
  { id: '21', text: 'Hum Samsheer Utha Lenge', tamilMeaning: 'நாங்க சாம்ஷீரை எடுத்துக்குவோம்,' },
  { id: '22', text: 'Hum Samsheer Utha Lenge.', tamilMeaning: 'சாம்ஷீரை எடுப்போம்.' },
  { id: '23', text: '' },
  { id: '24', text: 'Bhikre-Bhikre Tarey Hain Hum', tamilMeaning: 'நாங்கள் பிச்சைக்காரர்கள், பிச்சைக்காரர்கள்.' },
  { id: '25', text: 'Lekin Jhilmil Ek Hai', tamilMeaning: 'ஆனால் ஜில்மில் ஒருவர்,' },
  { id: '26', text: 'Ha, Ha, Ha Ek Hai', tamilMeaning: 'ஹா, ஹா, ஹா என்பது ஒன்றுதான்,' },
  { id: '27', text: 'Ho, Ho, Ho Ek Hai.', tamilMeaning: 'ஹோ, ஹோ, ஹோ என்பது ஒன்றுதான்.' },
  { id: '28', text: '' },
  { id: '29', text: 'Mandir Gurudware Bhi Hain Yahan', tamilMeaning: 'இங்கு கோயில்கள் மற்றும் குருத்வாராக்களும் உள்ளன.' },
  { id: '30', text: 'Aur Masjid Bhi Hai Yahan', tamilMeaning: 'மசூதியும் இங்குதான் இருக்கிறது.' },
  { id: '31', text: 'Girja Ka Hai Ghadiyal Kahin', tamilMeaning: 'முதலை எங்கோ தேவாலயத்திற்கு சொந்தமானது.' },
  { id: '32', text: 'Mullah ki Kahin Hai Azaan', tamilMeaning: 'முல்லா எங்கோ அஸான்' },
  { id: '33', text: 'Mandir Gurudware Bhi Hain Yahan', tamilMeaning: 'இங்கு கோயில்கள் மற்றும் குருத்வாராக்களும் உள்ளன.' },
  { id: '34', text: 'Aur Masjid Bhi Hai Yahan', tamilMeaning: 'மசூதியும் இங்குதான் இருக்கிறது.' },
  { id: '35', text: 'Girja Ka Hai Ghadiyal Kahin', tamilMeaning: 'முதலை எங்கோ தேவாலயத்திற்கு சொந்தமானது.' },
  { id: '36', text: 'Mullah ki Kahin Hai Azaan', tamilMeaning: 'முல்லா எங்கோ அஸான்' },
  { id: '37', text: '' },
  { id: '38', text: 'Ek Hi Apna Ram Hai', tamilMeaning: 'ஒரே ஒரு ராமன் தான்,' },
  { id: '39', text: 'Ek hi Allah Taala Hai', tamilMeaning: 'இறைவன் ஒருவனே,' },
  { id: '40', text: 'Ek Hi Allah Taala Hai', tamilMeaning: 'இறைவன் ஒருவனே,' },
  { id: '41', text: '' },
  { id: '42', text: 'Rang Birange Deepak Hain Hum', tamilMeaning: 'நாங்கள் வண்ணமயமான விளக்குகள் ஒரு பிரகாசம் ஒன்றுதான்.,' },
  { id: '43', text: 'Ek Jagmag Ek Hai', tamilMeaning: 'ஹா, ஹா, ஹா என்பது ஒன்றுதான்,' },
  { id: '44', text: 'Ha, Ha, Ha Ek Hai', tamilMeaning: 'ஹோ, ஹோ, ஹோ.' },
  { id: '45', text: 'Ho, Ho, Ho EkHai.', tamilMeaning: 'நாம் அனைவரும் இந்தியர்கள்.' },
  { id: '46', text: '' },
];

export default function NccSongLyrics() {
  const [tamilMeaning, setTamilMeaning] = useState('');

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback onPress={() => setTamilMeaning(item.tamilMeaning)}>
      <View>
        <Text style={styles.lyrics}>{item.text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>NCC SONG</Text>
      <FlatList
        data={lyricsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      {tamilMeaning !== '' && (
        <TouchableWithoutFeedback onPress={() => setTamilMeaning('')}>
          <View style={styles.tamilMeaningContainer}>
            <Text style={styles.tamilMeaning}>{tamilMeaning}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  lyrics: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4287f5', // Unique color
  },
  flatListContainer: {
    flexGrow: 1,
  },
  tamilMeaningContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tamilMeaning: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
