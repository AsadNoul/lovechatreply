import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = ({navigation}) => {
  const [replyReminders, setReplyReminders] = useState(true);
  const [appUpdates, setAppUpdates] = useState(false);

  const SettingItem = ({icon, title, subtitle, onPress, showArrow = true}) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color="#FF1744" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && <Icon name="chevron-right" size={24} color="#999" />}
    </TouchableOpacity>
  );

  const ToggleItem = ({icon, title, value, onValueChange}) => (
    <View style={styles.settingItem}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color="#FF1744" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{false: '#E0E0E0', true: '#FFB3C1'}}
        thumbColor={value ? '#FF1744' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="web"
              title="Default language"
              subtitle="English"
              onPress={() => {}}
            />
            <SettingItem
              icon="emoticon-kiss-outline"
              title="Default tone"
              subtitle="Romantic"
              onPress={() => {}}
            />
            <SettingItem
              icon="ruler"
              title="Default length"
              subtitle="Medium"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            <ToggleItem
              icon="bell"
              title="Reply reminders"
              value={replyReminders}
              onValueChange={setReplyReminders}
            />
            <ToggleItem
              icon="update"
              title="App updates"
              value={appUpdates}
              onValueChange={setAppUpdates}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Icon name="delete" size={24} color="#FF1744" />
              </View>
              <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, styles.dangerText]}>
                  Clear all history
                </Text>
              </View>
            </TouchableOpacity>
            <SettingItem
              icon="shield-check"
              title="Content & safety rules"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionContent}>
            <View style={styles.settingItem}>
              <View style={styles.iconContainer}>
                <Icon name="cellphone" size={24} color="#FF1744" />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>App version</Text>
              </View>
              <Text style={styles.versionText}>1.0.0</Text>
            </View>
            <SettingItem
              icon="headset"
              title="Contact support"
              onPress={() => {}}
            />
            <SettingItem
              icon="file-document-outline"
              title="Terms of Service"
              onPress={() => {}}
            />
            <SettingItem
              icon="shield-lock"
              title="Privacy Policy"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCE4EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FCE4EC',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  dangerText: {
    color: '#FF1744',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});

export default SettingsScreen;
