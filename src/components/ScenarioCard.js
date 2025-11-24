import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function ScenarioCard({ scenario, onPress, isCustom = false }) {
  const getToneColor = (tone) => {
    const toneColors = {
      'Sincere': Colors.sincere,
      'Flirty': Colors.flirty,
      'Apology': Colors.apology,
      'Support': Colors.support,
    };
    return toneColors[tone] || Colors.primaryLight;
  };

  if (isCustom) {
    return (
      <TouchableOpacity
        style={[styles.card, styles.customCard]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: Colors.primaryLight }]}>
          <Text style={styles.customIcon}>+</Text>
        </View>
        <Text style={[styles.title, { color: Colors.primary }]}>{scenario.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: scenario.backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: getToneColor(scenario.tone) }]}>
        <Text style={styles.icon}>{scenario.icon}</Text>
      </View>
      <Text style={styles.title}>{scenario.title}</Text>
      {scenario.tone && (
        <View style={[styles.toneBadge, { backgroundColor: getToneColor(scenario.tone) }]}>
          <Text style={styles.toneText}>{scenario.tone}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    minHeight: 160,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  customCard: {
    backgroundColor: Colors.backgroundLight,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 30,
  },
  customIcon: {
    fontSize: 36,
    color: Colors.primary,
    fontWeight: '300',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  toneBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  toneText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
