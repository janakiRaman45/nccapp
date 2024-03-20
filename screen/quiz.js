import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Quiz, QuizItem } from 'react-native-quiz-maker';
import Pdf from 'react-native-pdf';
import { PDFJS } from 'react-native-pdfjs';

const QuizFromPDF = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        // Load the PDF file using PDFJS.getDocument
        const pdf = await PDFJS.getDocument({ uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf' });

        // Extract text content and parse questions
        const numPages = pdf.numPages;
        const extractedQuestions = [];

        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join('\n');

          // Here you can implement your logic to extract questions and answers from pageText
          // Example parsing logic:
          // const question = ...
          // const options = ...
          // const correctAnswer = ...
          // extractedQuestions.push({ question, options, correctAnswer });
        }

        setQuestions(extractedQuestions);
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    };

    loadPDF();
  }, []);

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
      />
      <View>
        {questions.map((question, index) => (
          <Quiz key={index}>
            <QuizItem question={question.question} options={question.options} correctAnswer={question.correctAnswer} />
          </Quiz>
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
  pdf: {
    flex: 1,
    width: '100%',
    height: '50%', // Adjust the height as needed
  },
});

export default QuizFromPDF;
