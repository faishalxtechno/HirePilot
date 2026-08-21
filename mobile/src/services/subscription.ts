export interface SubscriptionTier {
  id: 'free' | 'pro' | 'enterprise';
  name: string;
  price: string;
  billingPeriod: string;
  monthlyQuota: number;
  features: string[];
  popular?: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free Starter',
    price: '$0',
    billingPeriod: 'Forever Free',
    monthlyQuota: 3,
    features: [
      '3 Comprehensive AI Mock Interviews per month',
      'Instant AI scoring & feedback report',
      'ATS resume analysis & score breakdown',
      'Access to tech job board with match scores',
      'Lifetime transcript storage',
    ],
  },
  {
    id: 'pro',
    name: 'HirePilot Pro',
    price: '$24',
    billingPeriod: 'per month',
    monthlyQuota: 999,
    popular: true,
    features: [
      'Unlimited AI Mock Interviews (All roles & formats)',
      'Advanced System Design & DSA deep-dive sessions',
      'AI Resume Bullet Rewriter (Google XYZ format)',
      'Detailed audio voice mock interviews with live transcription',
      'Priority recruiter visibility and certified interview report',
      '24/7 Priority AI assistance',
    ],
  },
];

export const subscriptionService = {
  getTiers(): SubscriptionTier[] {
    return SUBSCRIPTION_TIERS;
  },
};
