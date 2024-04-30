import { theme } from '@/constants/theme';
import { hp, wp } from '@/helpers/common';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Categories from '@/components/categories';
import { apiCall } from '@/api/api';
import ImageGrid from '@/components/ImageGrid';
import { FetchImagesParamsType, ImageType } from '@/types';
import { debounce } from 'lodash';


var page = 1;



const HomeScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params: FetchImagesParamsType = { page: 1 }, append = false) => {
    let res = await apiCall(params);
    if (res?.success && res?.data.hits) {
      if (append) {
        setImages([...images, ...res.data.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
  };

  const handleChangeCategory = (category: string | null) => {
    setActiveCategory(category);
  };

  const handleSearch = (text: string) => {
    console.log('search', text);
    setSearch(text)
    if (text.length > 2) {
      page = 1
      setImages([])
      fetchImages({ page, q: text });
    }
    if (text == '') {
      page = 1
      setImages([])
      fetchImages({ page, });
    }
  };

  const clearSearch = () => {
    setSearch("");
    (searchInputRef?.current as any).clear()
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={(styles.container, { paddingTop })}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pixels</Text>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.seacrchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            style={styles.searchInput}
            onChangeText={handleTextDebounce}
            // value={search}
            ref={searchInputRef}
          />
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={clearSearch}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}

              />
            </Pressable>
          )}
        </View>
        {/* categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* images */}
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  seacrchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.neutral(0.2),
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
});

export default HomeScreen;
