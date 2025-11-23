import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

const OnboardingScreen3 = ({ navigation }) => {
  const handleGetStarted = async () => {
    // Mark onboarding as complete and navigate to home
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.illustrationBox}>
          <View style={styles.globeContainer}>
            <View style={styles.globe} />
            <View style={styles.microphoneIcon}>
              <Text style={styles.micEmoji}>🎤</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Voice & multiple languages</Text>
        <Text style={styles.subtitle}>
          Speak your feelings and get replies in English, Arabic, Urdu, Hindi and more.
        </Text>
      </View>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleGetStarted}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleGetStarted}>
          <Text style={styles.continueText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  illustrationBox: {
    width: 320,
    height: 400,
    backgroundColor: colors.accent.teal,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  globeContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  globe: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E0F7F7',
    borderWidth: 3,
    borderColor: '#B2F0F0',
  },
  microphoneIcon: {
    position: 'absolute',
    bottom: -20,
  },
  micEmoji: {
    fontSize: 80,
  },
  content: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD4DD',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 10,
    height: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 40,
  },
  skipText: {
    fontSize: 18,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen3;
