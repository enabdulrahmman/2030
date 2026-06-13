export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  flag: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'USD', name: 'الدولار الأمريكي', symbol: '$', rate: 1.0, flag: '🇺🇸' },
  { code: 'SAR', name: 'الريال السعودي', symbol: 'ر.س', rate: 3.75, flag: '🇸🇦' },
  { code: 'YER_SANAA', name: 'الريال اليمني - صنعاء', symbol: 'ر.ي (صنعاء)', rate: 535, flag: '🇾🇪' },
  { code: 'YER_ADEN', name: 'الريال اليمني - عدن', symbol: 'ر.ي (عدن)', rate: 1910, flag: '🇾🇪' }
];

export const convertPriceText = (text: string | undefined, currencyCode: string): string => {
  if (!text) return '';
  if (currencyCode === 'USD') return text;
  
  const rates: Record<string, number> = {
    SAR: 3.75,
    YER_SANAA: 535,
    YER_ADEN: 1910,
  };
  
  const symbols: Record<string, string> = {
    SAR: 'ر.س',
    YER_SANAA: 'ر.ي (صنعاء)',
    YER_ADEN: 'ر.ي (عدن)',
  };

  const rate = rates[currencyCode] || 1;
  const symbol = symbols[currencyCode] || '';

  // Regex to match $XX.XX or $XX
  return text.replace(/\$([0-9.,]+)/g, (match, p1) => {
    const val = parseFloat(p1.replace(/,/g, ''));
    if (isNaN(val)) return match;
    const converted = val * rate;
    
    let formattedValue: string;
    if (currencyCode.startsWith('YER')) {
      formattedValue = Math.round(converted).toLocaleString('en-US');
    } else {
      // 2 decimal places maximum, drop trailing zeros if possible
      const withDecimals = Math.round(converted * 100) / 100;
      if (withDecimals % 1 === 0) {
        formattedValue = withDecimals.toFixed(0);
      } else {
        formattedValue = withDecimals.toFixed(2);
      }
    }
    
    return `${formattedValue} ${symbol}`;
  });
};
