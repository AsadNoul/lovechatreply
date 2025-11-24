import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { tones, languages, lengths } from '../constants/scenarios';
import OptionSelector from '../components/OptionSelector';
import Picker from '../components/Picker';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { generateMessages } from '../services/messageGenerator';

export default function ScenarioDetailScreen({ route, navigation }) {
  const { scenario } = route.params;
  const { canGenerateMessage, addToHistory, getRemainingReplies } = useApp();

  const [selectedTone, setSelectedTone] = useState('Romantic');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedLength, setSelectedLength] = useState('Short');
  const [loading, setLoading] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: scenario.title,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, scenario.title]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Text style={styles.description}>{scenario.description}</Text>

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
          title={
            loading
              ? 'Generating...'
              : `Generate replies for this scenario`
          }
          variant="primary"
          onPress={async () => {
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
              const messages = await generateMessages(
                scenario,
                selectedTone,
                selectedLanguage,
                selectedLength
              );

              addToHistory({
                scenario: scenario.title,
                tone: selectedTone,
                language: selectedLanguage,
                length: selectedLength,
                messages,
                preview: messages[0],
                selectedMessage: 0,
              });

              navigation.navigate('MessageResults', {
                messages,
                scenario,
                tone: selectedTone,
                language: selectedLanguage,
                length: selectedLength,
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to generate messages. Please try again.');
            } finally {
              setLoading(false);
            }
          }}
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
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.textPrimary,
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
