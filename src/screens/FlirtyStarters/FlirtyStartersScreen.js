import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Clipboard,
} from 'react-native';
import { colors } from '../../theme/colors';

const FlirtyStartersScreen = ({ navigation }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const starters = [
    {
      category: 'Sweet & Simple',
      messages: [
        "Just wanted to say you've been on my mind all day 💭",
        "Can't stop smiling when I think about you 😊",
        "You make even the boring days feel special ✨",
        "Random thought: you're absolutely amazing",
      ],
    },
    {
      category: 'Playful & Fun',
      messages: [
        "Question: On a scale of 1-10, how much do you miss me? 😏",
        "I have a confession... I can't get you out of my head",
        "Just checking if you're as cute as I remember... yep, still cute 😉",
        "Warning: thinking about you might become my full-time job",
      ],
    },
    {
      category: 'Romantic',
      messages: [
        "Every love song suddenly makes sense when I think of you 🎵",
        "You're the highlight of my day, every single day ❤️",
        "I could get lost in conversation with you for hours",
        "Just wanted to remind you that you're incredibly special to me",
      ],
    },
    {
      category: 'Bold & Confident',
      messages: [
        "I think we should make plans. Tonight? Tomorrow? This weekend? 🗓️",
        "Just realized we'd make a pretty great team 😌",
        "Been thinking... you and I should spend more time together",
        "Not to be forward, but you're kind of irresistible",
      ],
    },
  ];

  const handleCopy = (message, index) => {
    Clipboard.setString(message);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const StarterCard = ({ message, index, categoryIndex }) => {
    const uniqueIndex = `${categoryIndex}-${index}`;
    return (
      <TouchableOpacity
        style={styles.starterCard}
        onPress={() => handleCopy(message, uniqueIndex)}>
        <Text style={styles.starterText}>{message}</Text>
        {copiedIndex === uniqueIndex ? (
          <View style={styles.copiedBadge}>
            <Text style={styles.copiedBadgeText}>✓ Copied</Text>
          </View>
        ) : (
          <Text style={styles.copyIcon}>📋</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flirty Starters</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>❤️ Conversation Starters</Text>
          <Text style={styles.subtitle}>
            Tap any message to copy and send it to your special someone
          </Text>

          {starters.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.category}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              {category.messages.map((message, index) => (
                <StarterCard
                  key={index}
                  message={message}
                  index={index}
                  categoryIndex={categoryIndex}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    fontSize: 32,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  category: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  starterCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  starterText: {
    fontSize: 15,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 22,
  },
  copyIcon: {
    fontSize: 20,
    marginLeft: 12,
  },
  copiedBadge: {
    backgroundColor: colors.accent.green,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 12,
  },
  copiedBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default FlirtyStartersScreen;
