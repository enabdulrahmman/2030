export interface ServiceItem {
  id: string;
  name: string;
  englishName?: string;
  description: string;
  priceText: string;
  originalPriceText?: string;
  discountPercentage?: number;
  features: string[];
  subFeatures?: string[];
  badge?: string;
  isPopular?: boolean;
  category: 'ai' | 'design' | 'learning' | 'business' | 'social' | 'commerce';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DiscountOffer {
  title: string;
  desc: string;
  iconName: string;
  badgeText?: string;
}
