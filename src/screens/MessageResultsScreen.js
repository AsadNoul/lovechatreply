import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Clipboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';

export default function MessageResultsScreen({ route, navigation }) {
  const { messages, scenario, tone, language, length } = route.params;
  const { addToFavorites, isFavorite } = useApp();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedMessage = messages[selectedIndex];

  const handleCopy = () => {
    Clipboard.setString(selectedMessage);
    Alert.alert('Copied!', 'Message copied to clipboard');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: selectedMessage,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share message');
    }
  };

  const handleFavorite = () => {
    if (!isFavorite(selectedMessage)) {
      addToFavorites({
        text: selectedMessage,
        scenario: scenario.title,
        tone,
      });
      Alert.alert('Saved!', 'Message added to favorites');
    } else {
      Alert.alert('Already saved', 'This message is already in your favorites');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Info */}
        <View style={styles.headerInfo}>
          <Text style={styles.scenarioTitle}>{scenario.title}</Text>
          <View style={styles.metadata}>
            <View style={styles.metadataItem}>
              <Ionicons name="color-palette" size={16} color={Colors.textSecondary} />
              <Text style={styles.metadataText}>{tone}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons name="language" size={16} color={Colors.textSecondary} />
              <Text style={styles.metadataText}>{language}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Ionicons name="text" size={16} color={Colors.textSecondary} />
              <Text style={styles.metadataText}>{length}</Text>
            </View>
          </View>
        </View>

        {/* Message Card */}
        <View style={styles.messageCard}>
          <Text style={styles.messageText}>{selectedMessage}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
            <Ionicons name="copy-outline" size={24} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Copy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleFavorite}>
            <Ionicons
              name={isFavorite(selectedMessage) ? 'heart' : 'heart-outline'}
              size={24}
              color={Colors.primary}
            />
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Alternative Messages */}
        {messages.length > 1 && (
          <View style={styles.alternativesSection}>
            <Text style={styles.alternativesTitle}>
              Other options ({messages.length})
            </Text>
            {messages.map((message, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.alternativeCard,
                  selectedIndex === index && styles.alternativeCardSelected,
                ]}
                onPress={() => setSelectedIndex(index)}
                activeOpacity={0.7}
              >
                <View style={styles.alternativeCardLeft}>
                  {selectedIndex === index && (
                    <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                  )}
                  <Text
                    style={[
                      styles.alternativeText,
                      selectedIndex === index && styles.alternativeTextSelected,
                    ]}
                    numberOfLines={2}
                  >
                    {message}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.textLight}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Button
          title="Generate New Messages"
          variant="secondary"
          style={styles.generateButton}
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Done"
          variant="primary"
          onPress={() => navigation.navigate('Main')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  headerInfo: {
    marginBottom: 24,
  },
  scenarioTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    gap: 16,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metadataText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  messageCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  messageText: {
    fontSize: 17,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  alternativesSection: {
    marginBottom: 24,
  },
  alternativesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  alternativeCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  alternativeCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.backgroundLight,
  },
  alternativeCardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alternativeText: {
    flex: 1,
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  alternativeTextSelected: {
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  bottomActions: {
    padding: 24,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: 12,
  },
  generateButton: {
    marginBottom: 0,
  },
});
