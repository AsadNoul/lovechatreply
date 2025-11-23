import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { scenarios } from '../constants/scenarios';
import ScenarioCard from '../components/ScenarioCard';
import Button from '../components/Button';

export default function HomeScreen({ navigation }) {
  const featuredScenarios = scenarios.slice(1, 4); // Get first 3 non-custom scenarios

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello! 👋</Text>
            <Text style={styles.title}>What would you like to say?</Text>
          </View>
          <TouchableOpacity
            style={styles.proButton}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Ionicons name="star" size={20} color={Colors.primary} />
            <Text style={styles.proButtonText}>Pro</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Replies Left Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Messages</Text>
          </View>
        </View>

        {/* Featured Scenarios */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Scenarios</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Scenarios')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {featuredScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onPress={() => navigation.navigate('ScenarioDetail', { scenario })}
            />
          ))}
        </View>

        {/* Upgrade Banner */}
        <View style={styles.upgradeBanner}>
          <View style={styles.upgradeBannerContent}>
            <Ionicons name="star" size={32} color={Colors.primary} />
            <View style={styles.upgradeBannerText}>
              <Text style={styles.upgradeBannerTitle}>
                Upgrade to HeartReply Pro
              </Text>
              <Text style={styles.upgradeBannerDescription}>
                Get unlimited replies and advanced features
              </Text>
            </View>
          </View>
          <Button
            title="Upgrade Now"
            variant="primary"
            style={styles.upgradeButton}
            onPress={() => navigation.navigate('Subscription')}
          />
        </View>
      </ScrollView>
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
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  proButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  proButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '500',
  },
  upgradeBanner: {
    backgroundColor: Colors.white,
    marginHorizontal: 24,
    marginTop: 16,
    padding: 24,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
  upgradeBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  upgradeBannerText: {
    flex: 1,
  },
  upgradeBannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  upgradeBannerDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  upgradeButton: {
    marginTop: 8,
  },
});
