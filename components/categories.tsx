import {Text, View, StyleSheet, FlatList, Pressable} from 'react-native';
import React from 'react';
import {data} from '@/constants/data';
import {hp, wp} from '@/helpers/common';
import {theme} from '@/constants/theme';
import Animated, {FadeInRight} from 'react-native-reanimated';

type Props = {
  activeCategory: string | null;
  handleChangeCategory: (category: string | null) => void;
};
const Categories = ({activeCategory, handleChangeCategory}: Props) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={item => item}
      renderItem={({item, index}) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  );
};

type CategoryItemProps = {
  title: string;
  index: number;
  isActive: boolean;
  handleChangeCategory: (category: string | null) => void;
};
const CategoryItem = ({
  title,
  handleChangeCategory,
  isActive,
  index,
}: CategoryItemProps) => {
  let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  let backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}>
      <Pressable
        style={[styles.category, {backgroundColor}]}
        onPress={() => handleChangeCategory(isActive ? null : title)}>
        <Text style={[styles.title, {color}]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(5),
    gap: 8,
  },
  category: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});

export default Categories;
