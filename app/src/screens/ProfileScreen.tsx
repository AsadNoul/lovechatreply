import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/useAppStore';
import { Colors, Spacing, BorderRadius, FontSizes } from '../constants/theme';

export default function ProfileScreen() {
  const { user, includeEmoji, setIncludeEmoji } = useAppStore();

  const isPro = user?.isPro || false;

  const handleUpgradeToPro = () => {
    // TODO: Implement RevenueCat paywall
    console.log('Upgrade to Pro');
  };

  const handleLogin = () => {
    // TODO: Implement Supabase auth
    console.log('Login');
  };

  const handleSettingPress = (setting: string) => {
    console.log('Setting pressed:', setting);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* User Section */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color={Colors.primary} />
          </View>
          {user ? (
            <>
              <Text style={styles.userName}>{user.email || 'User'}</Text>
              <View style={styles.badge}>
                <Ionicons
                  name={isPro ? 'star' : 'star-outline'}
                  size={16}
                  color={isPro ? '#FFD700' : Colors.textSecondary}
                />
                <Text style={[styles.badgeText, isPro && styles.badgeTextPro]}>
                  {isPro ? 'PRO Member' : 'Free'}
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.userName}>Guest User</Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Sign In / Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Pro Upgrade Card */}
        {!isPro && (
          <View style={styles.proCard}>
            <View style={styles.proHeader}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={styles.proTitle}>Upgrade to Pro</Text>
            </View>
            <Text style={styles.proDescription}>
              Unlock unlimited replies, advanced tones, and priority support
            </Text>
            <View style={styles.proFeatures}>
              <View style={styles.proFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <Text style={styles.proFeatureText}>Unlimited generations</Text>
              </View>
              <View style={styles.proFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <Text style={styles.proFeatureText}>Advanced AI models</Text>
              </View>
              <View style={styles.proFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <Text style={styles.proFeatureText}>Save favorites</Text>
              </View>
              <View style={styles.proFeature}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.success}
                />
                <Text style={styles.proFeatureText}>History sync</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleUpgradeToPro}
            >
              <Text style={styles.upgradeButtonText}>Get Pro Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="happy-outline"
                size={24}
                color={Colors.textSecondary}
              />
              <Text style={styles.settingText}>Include Emoji by Default</Text>
            </View>
            <Switch
              value={includeEmoji}
              onValueChange={setIncludeEmoji}
              trackColor={{ false: Colors.border, true: Colors.primary }}
            />
          </View>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('language')}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="language-outline"
                size={24}
                color={Colors.textSecondary}
              />
              <Text style={styles.settingText}>Default Language</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>English</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textSecondary}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('tone')}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={Colors.textSecondary}
              />
              <Text style={styles.settingText}>Default Tone</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>Friendly</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textSecondary}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* App Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('privacy')}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="shield-outline"
                size={24}
                color={Colors.textSecondary}
              />
              <Text style={styles.settingText}>Privacy Policy</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('terms')}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={Colors.textSecondary}
              />
              <Text style={styles.settingText}>Terms of Service</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress('about')}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={Colors.textSecondary}
              />
              <Text style={styles.settingText}>About</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>v1.0.0</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textSecondary}
              />
            </View>
          </TouchableOpacity>
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
  userSection: {
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.xl,
    gap: Spacing.xs,
  },
  badgeText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  badgeTextPro: {
    color: '#FFD700',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.sm,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  proCard: {
    margin: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: '#FFF9E6',
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  proHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  proTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  proDescription: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  proFeatures: {
    marginBottom: Spacing.md,
  },
  proFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  proFeatureText: {
    fontSize: FontSizes.sm,
    color: Colors.text,
  },
  upgradeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: FontSizes.md,
    fontWeight: 'bold',
  },
  section: {
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginLeft: Spacing.md,
    marginBottom: Spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  settingText: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  settingValue: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
});
