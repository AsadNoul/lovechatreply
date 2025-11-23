import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/theme';
import { Tone } from '../types';

const TONES: { label: string; value: Tone }[] = [
  { label: 'Friendly', value: 'friendly' },
  { label: 'Professional', value: 'professional' },
  { label: 'Romantic', value: 'romantic' },
  { label: 'Casual', value: 'casual' },
  { label: 'Formal', value: 'formal' },
];

export default function HomeScreen() {
  const {
    inputMessage,
    setInputMessage,
    selectedTone,
    setSelectedTone,
    includeEmoji,
    setIncludeEmoji,
    generatedReplies,
  } = useAppStore();

  const handleGenerate = () => {
    // TODO: Implement API call
    console.log('Generate replies clicked');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Input Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Message / Situation</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Paste the message you received or describe the situation..."
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline
            numberOfLines={4}
            placeholderTextColor={Colors.textSecondary}
          />
        </View>

        {/* Tone Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Tone</Text>
          <View style={styles.toneContainer}>
            {TONES.map((tone) => (
              <TouchableOpacity
                key={tone.value}
                style={[
                  styles.toneChip,
                  selectedTone === tone.value && styles.toneChipActive,
                ]}
                onPress={() => setSelectedTone(tone.value)}
              >
                <Text
                  style={[
                    styles.toneText,
                    selectedTone === tone.value && styles.toneTextActive,
                  ]}
                >
                  {tone.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emoji Toggle */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setIncludeEmoji(!includeEmoji)}
          >
            <Text style={styles.label}>Include Emoji</Text>
            <View style={[styles.toggle, includeEmoji && styles.toggleActive]}>
              <View
                style={[
                  styles.toggleCircle,
                  includeEmoji && styles.toggleCircleActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Generate Button */}
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
          <Text style={styles.generateButtonText}>Generate Replies</Text>
        </TouchableOpacity>

        {/* Generated Replies Preview */}
        {generatedReplies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Generated Replies</Text>
            {generatedReplies.map((reply) => (
              <View key={reply.id} style={styles.replyCard}>
                <Text style={styles.replyText}>{reply.text}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Placeholder Cards */}
        {generatedReplies.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Your replies will appear here</Text>
            <View style={styles.placeholderCard}>
              <Text style={styles.placeholderText}>
                Tap "Generate Replies" to get AI-powered response suggestions
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
  section: {
    padding: Spacing.md,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  textArea: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.text,
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
    textAlignVertical: 'top',
  },
  toneContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  toneChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toneChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  toneText: {
    fontSize: FontSizes.sm,
    color: Colors.text,
  },
  toneTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  generateButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
  },
  replyCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  replyText: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  placeholderCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
