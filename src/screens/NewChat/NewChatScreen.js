import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { colors } from '../../theme/colors';
import { ReplyService } from '../../services/ReplyService';

const NewChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [relationship, setRelationship] = useState('new');
  const [tones, setTones] = useState(['sweet']);
  const [language, setLanguage] = useState('english');
  const [length, setLength] = useState('short');
  const [includeEmojis, setIncludeEmojis] = useState(true);

  const relationshipOptions = [
    { id: 'new', label: 'New' },
    { id: 'dating', label: 'Dating' },
    { id: 'long-term', label: 'Long-term' },
    { id: 'long-distance', label: 'Long-distance' },
  ];

  const toneOptions = [
    { id: 'sweet', label: 'Sweet' },
    { id: 'playful', label: 'Playful' },
    { id: 'bold', label: 'Bold' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'apology', label: 'Apology' },
    { id: 'repair', label: 'Repair' },
  ];

  const languageOptions = [
    { id: 'english', label: 'English' },
    { id: 'arabic', label: 'Arabic' },
    { id: 'urdu', label: 'Urdu' },
    { id: 'hindi', label: 'Hindi' },
    { id: 'spanish', label: 'Spanish' },
    { id: 'french', label: 'French' },
  ];

  const lengthOptions = [
    { id: 'short', label: 'Short' },
    { id: 'medium', label: 'Medium' },
    { id: 'long', label: 'Long' },
  ];

  const toggleTone = (toneId) => {
    if (tones.includes(toneId)) {
      setTones(tones.filter((t) => t !== toneId));
    } else if (tones.length < 3) {
      setTones([...tones, toneId]);
    }
  };

  const handleGenerateReplies = async () => {
    if (!message.trim()) {
      return;
    }

    const context = {
      message,
      relationship,
      tones,
      language,
      length,
      includeEmojis,
    };

    navigation.navigate('ReplyOptions', { context });
  };

  const OptionButton = ({ selected, onPress, children }) => (
    <TouchableOpacity
      style={[styles.optionButton, selected && styles.optionButtonSelected]}
      onPress={onPress}>
      <Text
        style={[
          styles.optionButtonText,
          selected && styles.optionButtonTextSelected,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>HeartReply ❤️</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Main Title */}
          <Text style={styles.mainTitle}>Paste their message</Text>

          {/* Message Input */}
          <TextInput
            style={styles.messageInput}
            placeholder="What did they say?"
            placeholderTextColor={colors.text.light}
            multiline
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />

          <Text style={styles.privacyNote}>
            We don't store your chats. You can clear history anytime.
          </Text>

          {/* Context & Tone Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Context & Tone</Text>

            {/* Relationship */}
            <Text style={styles.label}>Relationship</Text>
            <View style={styles.optionsRow}>
              {relationshipOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={relationship === option.id}
                  onPress={() => setRelationship(option.id)}>
                  {option.label}
                </OptionButton>
              ))}
            </View>

            {/* Tone */}
            <Text style={styles.label}>Tone (select up to 3)</Text>
            <View style={styles.optionsRow}>
              {toneOptions.map((option) => (
                <OptionButton
                  key={option.id}
                  selected={tones.includes(option.id)}
                  onPress={() => toggleTone(option.id)}>
                  {option.label}
                </OptionButton>
              ))}
            </View>

            {/* Language & Length */}
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.label}>Language</Text>
                <View style={styles.selectContainer}>
                  <TouchableOpacity
                    style={styles.select}
                    onPress={() => {
                      // Show language picker
                    }}>
                    <Text style={styles.selectText}>
                      {languageOptions.find((l) => l.id === language)?.label}
                    </Text>
                    <Text style={styles.selectArrow}>▼</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.label}>Length</Text>
                <View style={styles.optionsRow}>
                  {lengthOptions.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={length === option.id}
                      onPress={() => setLength(option.id)}>
                      {option.label}
                    </OptionButton>
                  ))}
                </View>
              </View>
            </View>

            {/* Include Emojis */}
            <View style={styles.switchRow}>
              <Text style={styles.label}>Include Emojis</Text>
              <Switch
                value={includeEmojis}
                onValueChange={setIncludeEmojis}
                trackColor={{ false: '#D1D5DB', true: colors.primaryLight }}
                thumbColor={includeEmojis ? colors.primary : '#F3F4F6'}
              />
            </View>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={[
              styles.generateButton,
              !message.trim() && styles.generateButtonDisabled,
            ]}
            onPress={handleGenerateReplies}
            disabled={!message.trim()}>
            <Text style={styles.generateButtonText}>Generate Replies</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 32,
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  messageInput: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: colors.text.primary,
    minHeight: 120,
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  privacyNote: {
    fontSize: 12,
    color: colors.text.light,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
    marginTop: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  optionButtonTextSelected: {
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  selectContainer: {
    marginTop: 8,
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  selectArrow: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  generateButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 8,
  },
  generateButtonDisabled: {
    backgroundColor: colors.button.disabled,
    shadowOpacity: 0,
  },
  generateButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewChatScreen;
