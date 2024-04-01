import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import firebase from './firebase'; // Import the initialized Firebase instance

const ClientNewsPage = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const newsRef = firebase.database().ref('news/newsItems');
    newsRef.on('value', (snapshot) => {
      const newsData = snapshot.val();
      if (newsData) {
        const newsItems = Object.entries(newsData).map(([key, value]) => ({
          id: key,
          link: value.link,
          content: value.content,
        }));
        setNewsList(newsItems);
      }
    });

    // Unsubscribe on unmount
    return () => newsRef.off('value');
  }, []);

  const handleLinkPress = (link) => {
    Linking.openURL(link);
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      <TouchableOpacity onPress={() => handleLinkPress(item.link)}>
        <Text style={styles.newsLink}>{item.link}</Text>
      </TouchableOpacity>
      <Text style={styles.newsContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={newsList}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flatList: {
    flex: 1,
  },
  newsItem: {
    marginBottom: 10,
  },
  newsLink: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'blue',
  },
  newsContent: {
    marginBottom: 5,
  },
});

export default ClientNewsPage;