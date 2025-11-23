import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import Button from '../components/Button';

export default function SubscriptionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={28} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HeartReply Pro</Text>
          <Text style={styles.description}>
            For power texters and deep lovers 💕
          </Text>
        </View>

        {/* Free Plan */}
        <View style={styles.planCard}>
          <Text style={styles.planType}>Free</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$0</Text>
            <Text style={styles.period}>/forever</Text>
          </View>
          <View style={styles.currentPlanBadge}>
            <Text style={styles.currentPlanText}>Current Plan</Text>
          </View>
          <View style={styles.featuresList}>
            <FeatureItem text="5 replies per day" />
            <FeatureItem text="Access to basic tones" />
            <FeatureItem text="Standard support" />
          </View>
        </View>

        {/* Pro Plan */}
        <View style={[styles.planCard, styles.proPlanCard]}>
          <View style={styles.mostPopularBadge}>
            <Text style={styles.mostPopularText}>Most Popular</Text>
          </View>
          <Text style={styles.planType}>Pro</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$9.99</Text>
            <Text style={styles.period}>/month</Text>
          </View>
          <Button
            title="Choose Pro"
            variant="primary"
            style={styles.proButton}
            onPress={() => {}}
          />
          <View style={styles.featuresList}>
            <FeatureItem text="Unlimited romantic replies" />
            <FeatureItem text="Unlock all advanced tones" />
            <FeatureItem text="Voice Mode for hands-free crafting" />
            <FeatureItem text="Priority customer support" />
          </View>
        </View>

        {/* Continue Button */}
        <Button
          title="Continue with Pro"
          variant="primary"
          style={styles.continueButton}
          onPress={() => navigation.goBack()}
        />

        {/* Maybe Later */}
        <TouchableOpacity
          style={styles.maybeLaterButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.maybeLaterText}>Maybe later</Text>
        </TouchableOpacity>

        {/* Fine Print */}
        <Text style={styles.finePrint}>
          Cancel anytime. Your subscription will automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period.
        </Text>
      </ScrollView>
    </View>
  );
}

function FeatureItem({ text }) {
  return (
    <View style={styles.featureItem}>
      <Ionicons name="checkmark" size={20} color={Colors.primary} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  planCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  proPlanCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  mostPopularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  mostPopularText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  planType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  price: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  period: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  currentPlanBadge: {
    backgroundColor: Colors.backgroundLight,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  currentPlanText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  proButton: {
    backgroundColor: Colors.buttonSecondary,
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
  },
  continueButton: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  maybeLaterButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  maybeLaterText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  finePrint: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 32,
    paddingBottom: 32,
    lineHeight: 18,
  },
});
