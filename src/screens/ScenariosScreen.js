import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { scenarios } from '../constants/scenarios';
import ScenarioCard from '../components/ScenarioCard';

export default function ScenariosScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScenarios = scenarios.filter((scenario) =>
    scenario.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Scenarios</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="search" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search situations: apology, good mor..."
          placeholderTextColor={Colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Scenarios Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scenariosContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {filteredScenarios.map((scenario, index) => {
            if (scenario.isCustom) {
              return (
                <View key={scenario.id} style={styles.gridItemFull}>
                  <ScenarioCard
                    scenario={scenario}
                    isCustom
                    onPress={() => {}}
                  />
                </View>
              );
            }

            // Determine if this is a full-width item (first after custom)
            const isFullWidth = index === 1;

            return (
              <View
                key={scenario.id}
                style={isFullWidth ? styles.gridItemFull : styles.gridItem}
              >
                <ScenarioCard
                  scenario={scenario}
                  onPress={() =>
                    navigation.navigate('ScenarioDetail', { scenario })
                  }
                />
              </View>
            );
          })}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 24,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scenariosContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    width: '48%',
  },
  gridItemFull: {
    width: '100%',
  },
});
