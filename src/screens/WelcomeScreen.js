import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#FFF5F7', '#FFE5EC']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.heartIcon}>
            <Text style={styles.heartEmoji}>💗</Text>
            <View style={styles.flagIcon}>
              <View style={styles.flag} />
              <View style={styles.flagPole} />
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>HeartReply</Text>
        <Text style={styles.subtitle}>Say the right thing, kindly.</Text>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Tagline */}
        <Text style={styles.tagline}>
          For couples, crushes, and new connections.
        </Text>
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Main')}
          activeOpacity={0.8}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 40,
  },
  heartIcon: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartEmoji: {
    fontSize: 80,
  },
  flagIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  flag: {
    width: 30,
    height: 20,
    backgroundColor: Colors.primaryLight,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  flagPole: {
    width: 3,
    height: 25,
    backgroundColor: Colors.primaryLight,
    marginLeft: 27,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
