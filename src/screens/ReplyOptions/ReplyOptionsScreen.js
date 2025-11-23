import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Clipboard,
} from 'react-native';
import { colors } from '../../theme/colors';
import { ReplyService } from '../../services/ReplyService';

const ReplyOptionsScreen = ({ route, navigation }) => {
  const { context } = route.params;
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    generateReplies();
  }, []);

  const generateReplies = async () => {
    setLoading(true);
    try {
      const generatedReplies = await ReplyService.generateReplies(context);
      setReplies(generatedReplies);
    } catch (error) {
      console.error('Error generating replies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (reply, index) => {
    Clipboard.setString(reply.text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleModify = (reply, modification) => {
    // Generate modified version
    const modifiedContext = {
      ...context,
      modification,
      originalReply: reply.text,
    };
    navigation.push('ReplyOptions', { context: modifiedContext });
  };

  const ReplyCard = ({ reply, index }) => (
    <View style={styles.replyCard}>
      <View style={styles.replyHeader}>
        <Text style={styles.replyTitle}>Option {index + 1}</Text>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => handleCopy(reply, index)}>
          <Text style={styles.copyIcon}>📋</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.replyText}>{reply.text}</Text>

      {copiedIndex === index && (
        <View style={styles.copiedBanner}>
          <Text style={styles.copiedText}>✓ Copied to clipboard</Text>
        </View>
      )}

      <View style={styles.modificationButtons}>
        <TouchableOpacity
          style={styles.modButton}
          onPress={() => handleModify(reply, 'softer')}>
          <Text style={styles.modButtonText}>Softer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modButton}
          onPress={() => handleModify(reply, 'playful')}>
          <Text style={styles.modButtonText}>More playful</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modButton}
          onPress={() => handleModify(reply, 'shorter')}>
          <Text style={styles.modButtonText}>Shorter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HeartReply ❤️</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Crafting perfect replies...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.mainTitle}>Here are a few options...</Text>

            {replies.map((reply, index) => (
              <ReplyCard key={index} reply={reply} index={index} />
            ))}

            <TouchableOpacity
              style={styles.pasteButton}
              onPress={() => {
                // Handle paste to WhatsApp
              }}>
              <Text style={styles.pasteButtonText}>
                Copied. Paste it into WhatsApp ✨
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newReplyButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.newReplyButtonText}>Generate New Replies</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text.secondary,
  },
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 20,
  },
  replyCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  replyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  copyButton: {
    padding: 4,
  },
  copyIcon: {
    fontSize: 20,
  },
  replyText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    marginBottom: 12,
  },
  copiedBanner: {
    backgroundColor: colors.accent.green,
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  copiedText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  modificationButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  modButtonText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  pasteButton: {
    backgroundColor: colors.accent.green,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  pasteButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  newReplyButton: {
    backgroundColor: colors.white,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  newReplyButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReplyOptionsScreen;
