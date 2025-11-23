import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { tones, languages, lengths } from '../constants/scenarios';
import OptionSelector from '../components/OptionSelector';
import Button from '../components/Button';

export default function ScenarioDetailScreen({ route, navigation }) {
  const { scenario } = route.params;

  const [selectedTone, setSelectedTone] = useState('Romantic');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedLength, setSelectedLength] = useState('Short');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: scenario.title,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, scenario.title]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Text style={styles.description}>{scenario.description}</Text>

        {/* Tone Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a Tone</Text>
          <OptionSelector
            options={tones}
            selected={selectedTone}
            onSelect={setSelectedTone}
            horizontal
          />
        </View>

        {/* Language and Length */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Language</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{selectedLanguage}</Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Length</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{selectedLength}</Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Generate Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Generate replies for this scenario"
          variant="primary"
          onPress={() => {
            // TODO: Generate replies
            alert('Generating replies...');
          }}
        />
      </View>
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
    padding: 24,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  buttonContainer: {
    padding: 24,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
});
