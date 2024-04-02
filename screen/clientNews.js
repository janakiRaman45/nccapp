import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ClientNewsPage = () => {
  const newsList = [
    {
      id: '1',
      link: 'https://timesofindia.indiatimes.com/city/delhi/less-crowded-arvind-kejriwal-housed-in-jail-no-2-meant-for-convicts/articleshow/108958389.cms',
      content: 'NEW DELHI: A cell measuring 14 feet x 8 feet in Tihars Jail No. 2 is CM Arvind Kejriwals home for the next two weeks. He was sent into judicial custody on Monday. The cell has an attached toilet and is located in the general area of the prison meant for convicts. Housing around 600 individuals, the complex is less crowded than the jails meant for under-trial prisoners and has thus been chosen to house Kejriwal..',
    }
  ];

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
