import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/theme';

export default function VoiceScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  const handleMicPress = () => {
    // TODO: Implement voice recording
    setIsRecording(!isRecording);
    console.log('Mic pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Voice Mode</Text>
          <Text style={styles.subHeaderText}>
            Speak your situation and we'll generate perfect replies
          </Text>
        </View>

        {/* Microphone Button */}
        <View style={styles.micContainer}>
          <TouchableOpacity
            style={[
              styles.micButton,
              isRecording && styles.micButtonRecording,
            ]}
            onPress={handleMicPress}
          >
            <Ionicons
              name={isRecording ? 'stop' : 'mic'}
              size={64}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.micStatusText}>
            {isRecording ? 'Listening...' : 'Tap to speak'}
          </Text>

          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={[styles.pulse, styles.pulse1]} />
              <View style={[styles.pulse, styles.pulse2]} />
              <View style={[styles.pulse, styles.pulse3]} />
            </View>
          )}
        </View>

        {/* Transcribed Text */}
        {transcribedText && (
          <View style={styles.transcriptionContainer}>
            <Text style={styles.transcriptionLabel}>You said:</Text>
            <View style={styles.transcriptionBox}>
              <Text style={styles.transcriptionText}>{transcribedText}</Text>
            </View>
            <TouchableOpacity style={styles.generateButton}>
              <Text style={styles.generateButtonText}>
                Generate Replies from Voice
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Instructions */}
        {!transcribedText && !isRecording && (
          <View style={styles.instructionsContainer}>
            <View style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>1</Text>
              </View>
              <Text style={styles.instructionText}>
                Tap the microphone and describe your situation
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>2</Text>
              </View>
              <Text style={styles.instructionText}>
                We'll transcribe your speech to text
              </Text>
            </View>

            <View style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>3</Text>
              </View>
              <Text style={styles.instructionText}>
                Get AI-powered reply suggestions instantly
              </Text>
            </View>
          </View>
        )}

        {/* Feature Badge */}
        <View style={styles.featureBadge}>
          <Ionicons name="sparkles" size={16} color={Colors.primary} />
          <Text style={styles.featureBadgeText}>
            Coming Soon: Multi-language voice support
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerText: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subHeaderText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  micContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl * 2,
    position: 'relative',
  },
  micButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonRecording: {
    backgroundColor: Colors.error,
  },
  micStatusText: {
    fontSize: FontSizes.lg,
    color: Colors.text,
    marginTop: Spacing.lg,
    fontWeight: '600',
  },
  recordingIndicator: {
    position: 'absolute',
    top: Spacing.xl * 2,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: Colors.error,
    opacity: 0.6,
  },
  pulse1: {
    transform: [{ scale: 1.2 }],
  },
  pulse2: {
    transform: [{ scale: 1.4 }],
  },
  pulse3: {
    transform: [{ scale: 1.6 }],
  },
  transcriptionContainer: {
    padding: Spacing.md,
  },
  transcriptionLabel: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  transcriptionBox: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  transcriptionText: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  generateButton: {
    backgroundColor: Colors.primary,
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#fff',
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    padding: Spacing.lg,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  instructionNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  instructionNumberText: {
    color: '#fff',
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 'auto',
    marginBottom: Spacing.md,
  },
  featureBadgeText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
});
