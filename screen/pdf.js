import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PDFView } from 'react-native-pdf-lib';

const PDFPage = () => {
  const [pdfPaths, setPdfPaths] = useState([]);

  const downloadPDF = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const data = reader.result;
          console.log('PDF Base64:', data);
          setPdfPaths((prevPaths) => [...prevPaths, data]);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  };

  // Sample array of PDF URLs
  const pdfUrls = [
    'https://cdnbbsr.s3waas.gov.in/s307811dc6c422334ce36a09ff5cd6fe71/uploads/2020/01/2020011529.pdf',
    'https://example.com/pdf2.pdf',
    'https://example.com/pdf3.pdf',
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.pdfList}>
        {pdfUrls.map((url, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => downloadPDF(url)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Download PDF {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.pdfContainer}>
        {pdfPaths.map((path, index) => (
          <View key={index} style={styles.pdfView}>
            <PDFView
              fadeInDuration={250.0}
              style={styles.pdfView}
              resource={path}
              resourceType="base64"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  pdfContainer: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  pdfView: {
    marginBottom: 20,
    width: '100%',
    height: 300, // Adjust the height as needed
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
});

export default PDFPage;
