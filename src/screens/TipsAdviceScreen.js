import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TipsAdviceScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Communication', 'Date Ideas', 'Understanding'];

  const articles = [
    {
      id: 1,
      category: 'Communication',
      title: "Five Ways to Say 'I Love You' Without Words",
      description:
        'Discover non-verbal cues and actions that speak volumes in a relationship, strengthening your bond.',
      readTime: '5 min read',
      icon: 'hand-heart',
      color: '#FFB74D',
    },
    {
      id: 2,
      category: 'App Guides',
      title: 'Mastering the Art of the Good Morning Text',
      description:
        "Learn how to craft the perfect morning message to start your partner's day with a smile.",
      readTime: '3 min read',
      icon: 'weather-sunny',
      color: '#4FC3F7',
    },
    {
      id: 3,
      category: 'Conflict Resolution',
      title: 'How to Navigate Difficult Conversations',
      description:
        'Tips for discussing tough topics with your partner in a healthy and constructive way.',
      readTime: '7 min read',
      icon: 'chat-processing',
      color: '#81C784',
    },
  ];

  const ArticleCard = ({article}) => (
    <TouchableOpacity style={styles.articleCard}>
      <View
        style={[
          styles.articleImageContainer,
          {backgroundColor: article.color},
        ]}>
        <Icon name={article.icon} size={80} color="#FFF" />
      </View>
      <View style={styles.articleContent}>
        <Text style={styles.articleCategory}>{article.category}</Text>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleDescription}>{article.description}</Text>
        <Text style={styles.articleReadTime}>{article.readTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tips & Advice</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon
          name="magnify"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for tips..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.articlesContainer}>
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoryScroll: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#FF1744',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  articlesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  articleCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  articleImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleContent: {
    padding: 16,
  },
  articleCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF1744',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  articleReadTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default TipsAdviceScreen;
