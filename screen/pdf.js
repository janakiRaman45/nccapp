import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from '@react-native-firebase/storage';

const Book = ({ title, url, onPress }) => (
  <TouchableOpacity key={title} onPress={onPress} style={styles.book}>
    <Text style={styles.bookTitle}>{title}</Text>
    <Image source={require('../assets/ncclogo.jpg')} style={styles.bookImage} />
  </TouchableOpacity>
);

const PDFPage = () => {
  const [pdfPaths, setPdfPaths] = useState([]);

  useEffect(() => {
    const fetchPDFs = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'pdfs/'); // Assuming your PDFs are stored in a 'pdfs' folder

      try {
        const res = await listAll(listRef);
        const paths = await Promise.all(res.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { title: item.name, url };
        }));
        setPdfPaths(paths);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchPDFs();
  }, []);

  const handleBookPress = (url) => {
    // Logic for downloading PDF
    // You can use the URL to open the PDF in a PDF viewer or download it
    console.log('PDF URL:', url);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.bookList}>
        {pdfPaths.map((pdf) => (
          <Book
            key={pdf.title}
            title={pdf.title}
            url={pdf.url}
            onPress={() => handleBookPress(pdf.url)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookList: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  book: {
    backgroundColor: '#eee',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
});

export default PDFPage;
