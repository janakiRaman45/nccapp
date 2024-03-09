import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';

const AdminNewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [link, setLink] = useState('');
  const [content, setContent] = useState('');

  const addNews = () => {
    if (!link || !content) {
      alert('Please enter both link and content.');
      return;
    }
    setNewsList([...newsList, { link, content }]);
    setLink('');
    setContent('');
  };

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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Link"
          value={link}
          onChangeText={setLink}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Content"
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNews}>
          <Text style={styles.addButtonText}>Add News</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={newsList}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => index.toString()}
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default AdminNewsPage;
