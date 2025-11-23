import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/theme';
import { Scenario } from '../types';

const MOCK_SCENARIOS: Scenario[] = [
  {
    id: '1',
    title: 'First Date Follow-up',
    description: 'Craft the perfect message after a great first date',
    icon: 'heart-outline',
    examples: ['Thank you message', 'Ask for second date', 'Light flirting'],
  },
  {
    id: '2',
    title: 'Apology Message',
    description: 'Express sincere apologies and make things right',
    icon: 'sad-outline',
    examples: ['Missed date', 'Forgot important event', 'General apology'],
  },
  {
    id: '3',
    title: 'Morning/Night Messages',
    description: 'Sweet good morning or goodnight texts',
    icon: 'sunny-outline',
    examples: ['Good morning', 'Good night', 'Thinking of you'],
  },
  {
    id: '4',
    title: 'Long-Distance Love',
    description: 'Keep the spark alive across the miles',
    icon: 'airplane-outline',
    examples: ['Miss you', 'Counting days', 'Virtual date ideas'],
  },
  {
    id: '5',
    title: 'Flirty & Playful',
    description: 'Light-hearted, fun messages to keep things interesting',
    icon: 'flame-outline',
    examples: ['Compliments', 'Teasing', 'Playful banter'],
  },
  {
    id: '6',
    title: 'Relationship Check-in',
    description: 'Thoughtful messages to discuss feelings and plans',
    icon: 'chatbubbles-outline',
    examples: ['How are we doing?', 'Future plans', 'Deep conversation'],
  },
];

export default function ScenariosScreen() {
  const handleScenarioPress = (scenario: Scenario) => {
    // TODO: Navigate to scenario detail or populate home screen
    console.log('Scenario selected:', scenario.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Choose a Scenario</Text>
          <Text style={styles.subHeaderText}>
            Select a common situation to get tailored reply suggestions
          </Text>
        </View>

        <View style={styles.scenariosContainer}>
          {MOCK_SCENARIOS.map((scenario) => (
            <TouchableOpacity
              key={scenario.id}
              style={styles.scenarioCard}
              onPress={() => handleScenarioPress(scenario)}
            >
              <View style={styles.scenarioIconContainer}>
                <Ionicons
                  name={scenario.icon as keyof typeof Ionicons.glyphMap}
                  size={32}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.scenarioContent}>
                <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                <Text style={styles.scenarioDescription}>
                  {scenario.description}
                </Text>
                <View style={styles.examplesContainer}>
                  {scenario.examples.map((example, index) => (
                    <View key={index} style={styles.exampleChip}>
                      <Text style={styles.exampleText}>{example}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
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
  scrollView: {
    flex: 1,
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
  scenariosContainer: {
    padding: Spacing.md,
  },
  scenarioCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scenarioIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  scenarioContent: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  scenarioDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  exampleChip: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.sm,
  },
  exampleText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
});
