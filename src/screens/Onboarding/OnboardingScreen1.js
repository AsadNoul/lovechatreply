import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.phoneFrame}>
          <View style={styles.message}>
            <Text style={styles.messageText}>Thinking of you!</Text>
          </View>
          <View style={styles.messageHighlight}>
            <Text style={styles.messageHighlightText}>You always make me smile 😊</Text>
          </View>
          <View style={styles.message}>
            <Text style={styles.messageText}>Can't wait to see you</Text>
          </View>
          {/* Decorative balloons */}
          <View style={[styles.balloon, styles.balloon1]} />
          <View style={[styles.balloon, styles.balloon2]} />
          <View style={[styles.balloon, styles.balloon3]} />
          <View style={[styles.balloon, styles.balloon4]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Perfect replies in one tap</Text>
        <Text style={styles.subtitle}>
          Paste their message and get 3 smart, kind options to send.
        </Text>
      </View>

      <View style={styles.pagination}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Onboarding2')}>
          <Text style={styles.continueText}>Continue</Text>
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
  phoneFrame: {
    width: 300,
    height: 400,
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    justifyContent: 'center',
    position: 'relative',
  },
  message: {
    backgroundColor: '#F5E6E8',
    borderRadius: 20,
    padding: 15,
    marginVertical: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: colors.text.primary,
    fontSize: 15,
  },
  messageHighlight: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    marginVertical: 8,
    maxWidth: '85%',
    alignSelf: 'flex-end',
  },
  messageHighlightText: {
    color: colors.white,
    fontSize: 15,
  },
  balloon: {
    position: 'absolute',
    width: 30,
    height: 35,
    backgroundColor: colors.primaryLight,
    borderRadius: 15,
    opacity: 0.6,
  },
  balloon1: { top: 20, right: 30, backgroundColor: colors.primary },
  balloon2: { bottom: 100, left: 20, backgroundColor: '#FFE0E6' },
  balloon3: { top: 180, right: 15, backgroundColor: '#FFE0E6' },
  balloon4: { bottom: 40, right: 50, backgroundColor: '#FFE0E6' },
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

export default OnboardingScreen1;
