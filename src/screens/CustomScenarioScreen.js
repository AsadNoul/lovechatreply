import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../constants/colors';
import { tones, languages, lengths } from '../constants/scenarios';
import OptionSelector from '../components/OptionSelector';
import Picker from '../components/Picker';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { generateCustomMessage } from '../services/messageGenerator';

export default function CustomScenarioScreen({ navigation }) {
  const { canGenerateMessage, addToHistory } = useApp();

  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState('Romantic');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedLength, setSelectedLength] = useState('Short');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Missing Information', 'Please describe what you want to say.');
      return;
    }

    if (!canGenerateMessage()) {
      Alert.alert(
        'Limit Reached',
        'You have used all your daily replies. Upgrade to Pro for unlimited messages!',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Upgrade',
            onPress: () => navigation.navigate('Subscription'),
          },
        ]
      );
      return;
    }

    setLoading(true);
    try {
      const messages = await generateCustomMessage(
        prompt,
        selectedTone,
        selectedLanguage,
        selectedLength
      );

      addToHistory({
        scenario: 'Custom: ' + prompt.substring(0, 30) + '...',
        tone: selectedTone,
        language: selectedLanguage,
        length: selectedLength,
        messages,
        preview: messages[0],
        selectedMessage: 0,
      });

      navigation.navigate('MessageResults', {
        messages,
        scenario: { title: 'Custom Message', description: prompt },
        tone: selectedTone,
        language: selectedLanguage,
        length: selectedLength,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Text style={styles.description}>
          Describe what you want to say, and we'll help you craft the perfect
          message!
        </Text>

        {/* Prompt Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What do you want to say?</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., I want to tell my partner I appreciate them..."
            placeholderTextColor={Colors.textLight}
            multiline
            numberOfLines={4}
            value={prompt}
            onChangeText={setPrompt}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{prompt.length}/200</Text>
        </View>

        {/* Tone Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a Tone</Text>
          <OptionSelector
            options={tones}
            selected={selectedTone}
            onSelect={setSelectedTone}
            horizontal
          />
        </View>

        {/* Language and Length */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Language</Text>
            <Picker
              value={selectedLanguage}
              options={languages}
              onValueChange={setSelectedLanguage}
              placeholder="Select Language"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Length</Text>
            <Picker
              value={selectedLength}
              options={lengths}
              onValueChange={setSelectedLength}
              placeholder="Select Length"
            />
          </View>
        </View>
      </ScrollView>

      {/* Generate Button */}
      <View style={styles.buttonContainer}>
        {!canGenerateMessage() && (
          <Text style={styles.limitText}>
            Daily limit reached. Upgrade to Pro for unlimited messages!
          </Text>
        )}
        <Button
          title={loading ? 'Generating...' : 'Generate Messages'}
          variant="primary"
          onPress={handleGenerate}
          style={!canGenerateMessage() && styles.buttonDisabled}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={styles.loadingIndicator}
          />
        )}
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
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'right',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  buttonContainer: {
    padding: 24,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  limitText: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  loadingIndicator: {
    marginTop: 12,
  },
});
