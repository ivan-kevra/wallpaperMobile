// const {
//   opacity,
// } = require('react-native-reanimated/lib/typescript/reanimated2/Colors');

export const theme: ThemeType = {
  colors: {
    white: '#fff',
    black: '#000',
    grayBG: '#e5e5e5',
    // neutral
    neutral: opacity => `rgba(10, 10, 10, ${opacity})`,
  },
  fontWeights: {
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
};

type ThemeType = {
  colors: {
    white: string;
    black: string;
    grayBG: string;
    neutral: (opacity: number) => string;
  };
  fontWeights: {
    medium: FontWeightType;
    semibold: FontWeightType;
    bold: FontWeightType;
  };
  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
};

type FontWeightType =
  | '500'
  | '600'
  | '700'
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '800'
  | '900';
