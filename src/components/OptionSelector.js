import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';

export default function OptionSelector({ options, selected, onSelect, horizontal = false }) {
  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContainer}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.horizontalOption,
              selected === option && styles.selectedOption,
            ]}
            onPress={() => onSelect(option)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.horizontalOptionText,
                selected === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.option, selected === option && styles.selectedOption]}
          onPress={() => onSelect(option)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.optionText,
              selected === option && styles.selectedOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  horizontalContainer: {
    gap: 12,
    paddingVertical: 4,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  horizontalOption: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedOption: {
    backgroundColor: Colors.backgroundLight,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  horizontalOptionText: {
    fontSize: 15,
    color: Colors.textPrimary,
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
