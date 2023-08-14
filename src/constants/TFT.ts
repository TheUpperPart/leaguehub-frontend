interface TFTTiers {
  [key: string]: {
    displayName: string;
    defaultValue: number;
  };
}

export const TFTTier: TFTTiers = {
  Iron: {
    displayName: '아이언',
    defaultValue: 0,
  },
  Bronze: {
    displayName: '브론즈',
    defaultValue: 400,
  },
  Silver: {
    displayName: '실버',
    defaultValue: 800,
  },
  Gold: {
    displayName: '골드',
    defaultValue: 1200,
  },
  Platinum: {
    displayName: '플래티넘',
    defaultValue: 1600,
  },
  Diamond: {
    displayName: '다이아몬드',
    defaultValue: 2000,
  },
  Master: {
    displayName: '마스터 이상',
    defaultValue: 2400,
  },
};
