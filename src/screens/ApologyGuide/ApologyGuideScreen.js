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

const ApologyGuideScreen = ({ navigation }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const apologies = [
    {
      category: 'Sincere Apologies',
      messages: [
        "I'm really sorry about what happened. I know I hurt you and I regret it deeply.",
        "You mean so much to me, and I hate that I let you down. I'm truly sorry.",
        "I messed up, and I want you to know how sorry I am. You deserve better.",
        "I can't stop thinking about how I hurt you. I'm so sorry and I want to make it right.",
      ],
    },
    {
      category: 'Taking Responsibility',
      messages: [
        "I was wrong, and I take full responsibility for my actions. I'm sorry.",
        "There's no excuse for what I did. I own my mistake and I'm truly sorry.",
        "I should have been more thoughtful. This is on me, and I apologize.",
        "I understand why you're upset. I was in the wrong and I'm sorry.",
      ],
    },
    {
      category: 'Making Amends',
      messages: [
        "I'm sorry for hurting you. Please tell me how I can make this right.",
        "I want to fix this. What can I do to show you how sorry I am?",
        "I know saying sorry isn't enough. I want to prove that I can do better.",
        "I'm committed to learning from this and being better. I'm so sorry.",
      ],
    },
    {
      category: 'Gentle & Understanding',
      messages: [
        "I'm sorry for my part in this. Can we talk about it when you're ready?",
        "I hate that we're not okay right now. I'm sorry for what I did.",
        "I miss us. I'm sorry for creating distance between us.",
        "I value you too much to let this go without a sincere apology. I'm sorry.",
      ],
    },
  ];

  const tips = [
    "Be specific about what you're apologizing for",
    "Avoid making excuses or shifting blame",
    "Show that you understand how they feel",
    "Give them space if they need it",
    "Follow up with actions, not just words",
  ];

  const handleCopy = (message, index) => {
    Clipboard.setString(message);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const ApologyCard = ({ message, index, categoryIndex }) => {
    const uniqueIndex = `${categoryIndex}-${index}`;
    return (
      <TouchableOpacity
        style={styles.apologyCard}
        onPress={() => handleCopy(message, uniqueIndex)}>
        <Text style={styles.apologyText}>{message}</Text>
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
        <Text style={styles.headerTitle}>Apology Guide</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>😔 Make Things Right</Text>
          <Text style={styles.subtitle}>
            Heartfelt apologies to help repair your relationship
          </Text>

          {/* Tips Section */}
          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>💡 Tips for Apologizing</Text>
            {tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          {/* Apology Categories */}
          {apologies.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.category}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              {category.messages.map((message, index) => (
                <ApologyCard
                  key={index}
                  message={message}
                  index={index}
                  categoryIndex={categoryIndex}
                />
              ))}
            </View>
          ))}

          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              Remember: A genuine apology is just the first step. Make sure to
              follow through with changed behavior and give them time to heal.
            </Text>
          </View>
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
    marginBottom: 20,
  },
  tipsBox: {
    backgroundColor: colors.accent.yellow + '20',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.accent.yellow + '40',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: colors.text.primary,
    marginRight: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 20,
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
  apologyCard: {
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
  apologyText: {
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
  noteBox: {
    backgroundColor: colors.primaryLight + '20',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  noteText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default ApologyGuideScreen;
