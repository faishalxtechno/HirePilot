import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { subscriptionService } from '../../services/subscription';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassBadge } from '../../components/ui/GlassBadge';
import { ScreenHeader } from '../../components/layout/ScreenHeader';
import { COLORS } from '../../constants/theme';
import { Zap, Check, Sparkles, ShieldCheck } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ProSubscriptionScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const tiers = subscriptionService.getTiers();

  const handleUpgrade = (tierName: string) => {
    Alert.alert(
      'Upgrade to ' + tierName,
      'Subscription upgrades can be completed directly through the HirePilot Web Portal with Stripe billing security.',
      [{ text: 'Got It' }]
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="HirePilot Pro"
        subtitle="Unlimited AI mock evaluations"
        showBack
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Pro Banner */}
        <GlassCard style={styles.bannerCard} variant="primary">
          <View style={styles.bannerRow}>
            <View style={styles.iconBox}>
              <Zap size={24} color="#ffb786" fill="#ffb786" />
            </View>
            <View style={{ flex: 1 }}>
              <GlassBadge label="ACCELERATE YOUR CAREER" variant="warning" />
              <Text style={styles.bannerTitle}>Unlock Unlimited Mock Sessions</Text>
              <Text style={styles.bannerDesc}>
                Practice unlimited technical, system design, and behavioral interview loops with Gemini Pro.
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Tiers List */}
        <View style={styles.tierList}>
          {tiers.map((tier) => (
            <GlassCard
              key={tier.id}
              style={[styles.tierCard, tier.popular && styles.popularCard]}
              variant={tier.popular ? 'elevated' : 'default'}
            >
              {tier.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                </View>
              )}

              <View style={styles.tierHeader}>
                <Text style={styles.tierName}>{tier.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceVal}>{tier.price}</Text>
                  <Text style={styles.priceSub}> / {tier.billingPeriod}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.featuresList}>
                {tier.features.map((feat, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Check size={14} color="#38bdf8" style={{ marginTop: 2 }} />
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}
              </View>

              <GlassButton
                title={tier.id === 'free' ? 'Current Plan' : 'Upgrade to Pro'}
                onPress={() => handleUpgrade(tier.name)}
                disabled={tier.id === 'free'}
                variant={tier.id === 'free' ? 'secondary' : 'primary'}
                size="lg"
                style={{ marginTop: 16 }}
              />
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bannerCard: {
    padding: 16,
    marginBottom: 16,
  },
  bannerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 183, 134, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 183, 134, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 6,
  },
  bannerDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
    marginTop: 2,
  },
  tierList: {
    gap: 16,
  },
  tierCard: {
    padding: 18,
    position: 'relative',
  },
  popularCard: {
    borderColor: 'rgba(56, 189, 248, 0.4)',
    backgroundColor: 'rgba(56, 189, 248, 0.05)',
  },
  popularBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#38bdf8',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  popularBadgeText: {
    color: '#001a42',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tierHeader: {
    gap: 4,
  },
  tierName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceVal: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  priceSub: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 14,
  },
  featuresList: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: COLORS.onSurface,
    lineHeight: 18,
    flex: 1,
  },
});
