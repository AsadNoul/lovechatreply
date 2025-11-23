import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../theme/colors';
import { StorageService } from '../../services/StorageService';

const HomeScreen = ({ navigation }) => {
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
    loadRecentChats();
  }, []);

  const loadRecentChats = async () => {
    const chats = await StorageService.getRecentChats();
    setRecentChats(chats);
  };

  const QuickActionCard = ({ title, icon, onPress, large = false }) => (
    <TouchableOpacity
      style={[styles.quickActionCard, large && styles.quickActionCardLarge]}
      onPress={onPress}>
      <Text style={styles.quickActionIcon}>{icon}</Text>
      <Text style={styles.quickActionTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const ChatItem = ({ name, preview, initial }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.chatAvatar}>
        <Text style={styles.chatAvatarText}>{initial}</Text>
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{name}</Text>
        <Text style={styles.chatPreview} numberOfLines={1}>
          {preview}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>HeartReply ❤️</Text>
            <Text style={styles.headerSubtitle}>Ready to charm hearts?</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickActionCard
              title="Add New Chat"
              icon="➕"
              large={true}
              onPress={() => navigation.navigate('NewChat')}
            />
            <View style={styles.quickActionsRight}>
              <QuickActionCard
                title="Flirty Starters"
                icon="❤️"
                onPress={() => navigation.navigate('FlirtyStarters')}
              />
              <QuickActionCard
                title="Apology Guide"
                icon="😔"
                onPress={() => navigation.navigate('ApologyGuide')}
              />
            </View>
          </View>
        </View>

        {/* Latest Chats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Chats</Text>
          {recentChats.length > 0 ? (
            recentChats.map((chat, index) => (
              <ChatItem
                key={index}
                name={chat.name}
                preview={chat.lastMessage}
                initial={chat.name.charAt(0)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No chats yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Tap "Add New Chat" to get started!
              </Text>
            </View>
          )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsIcon: {
    fontSize: 24,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
  },
  quickActionsRight: {
    flex: 1,
    gap: 16,
  },
  quickActionCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 100,
  },
  quickActionCardLarge: {
    flex: 1,
    backgroundColor: colors.primary,
    minHeight: 216,
  },
  quickActionIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chatAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  chatPreview: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.text.light,
  },
});

export default HomeScreen;
