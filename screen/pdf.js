import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import FileViewer from 'react-native-file-viewer';

const pdfFiles = [
  { name: "PDF 1", url: require("../assets/123.pdf"), thumbnail: require("../assets/ncclogo.jpg") },
  { name: "PDF 2", url: require("../assets/123.pdf"), thumbnail: require("../assets/ncclogo.jpg") },
  { name: "PDF 3", url: require("../assets/123.pdf"), thumbnail: require("../assets/ncclogo.jpg") },
  // Add more PDF files as needed with their respective thumbnails and urls
];

const PdfList = memo(() => {
  const openPdf = async (url) => {
    try {
      await FileViewer.open(url, { showOpenWithDialog: true, showAppsSuggestions: true });
    } catch (e) {
      console.warn("An error occurred", JSON.stringify(e));
    }
  };

  return (
    <View style={styles.container}>
      {pdfFiles.map((pdf, index) => (
        <TouchableOpacity key={index} onPress={() => openPdf(pdf.url)} style={styles.pdfItem}>
          <Text style={styles.pdfName}>{pdf.name}</Text>
          <Image source={pdf.thumbnail} style={styles.thumbnail} />
        </TouchableOpacity>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  pdfItem: {
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pdfName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default PdfList;
