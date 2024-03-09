import React, { useState } from 'react';
import { View, Button } from 'react-native';
import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

const PDFViewer = () => {
  const [pdfUri, setPdfUri] = useState(null);

  const downloadPDF = async () => {
    const reference = storage().ref('gs://nccmanagement-2f33e.appspot.com/materials/123.pdf');

    try {
      const url = await reference.getDownloadURL();
      const localFilePath = `${RNFS.DocumentDirectoryPath}/downloaded_file.pdf`;

      const options = {
        fromUrl: url,
        toFile: localFilePath,
      };

      const result = await RNFS.downloadFile(options).promise;

      // Check if download was successful
      if (result.statusCode === 200) {
        // Set the URI to the downloaded file
        setPdfUri(localFilePath);
      } else {
        console.error('Error downloading PDF: Download failed');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Download PDF" onPress={downloadPDF} />
      {pdfUri && <PDFView style={{ flex: 1 }} source={{ uri: pdfUri }} />}
    </View>
  );
};

export default PDFViewer;
