import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

const OnboardingScreen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.illustrationBox}>
          <View style={styles.personIllustration}>
            {/* Simple illustration representation */}
            <View style={styles.personCircle}>
              <Text style={styles.heartIcon}>❤️</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Explain your situation</Text>
        <Text style={styles.subtitle}>
          Tell us the context and we'll help you say it right.
        </Text>
      </View>

      <View style={styles.pagination}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding3')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Onboarding3')}>
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
  illustrationBox: {
    width: 320,
    height: 400,
    backgroundColor: '#FFF9E6',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personIllustration: {
    alignItems: 'center',
  },
  personCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 60,
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

export default OnboardingScreen2;
