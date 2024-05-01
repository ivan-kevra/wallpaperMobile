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
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Categories from '@/components/categories';
import { apiCall } from '@/api/api';
import ImageGrid from '@/components/ImageGrid';
import { FetchImagesParamsType, ImageType } from '@/types';
import { debounce } from 'lodash';
import FiltersModal from '@/components/filtersModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';


var page = 1;



const HomeScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);
  const [filters, setFilters] = useState<any>(null);
  const searchInputRef = useRef(null);
  const modalRef = useRef<BottomSheetModal>(null);


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
  const openFiltersModal = () => {
    modalRef.current?.present();
  }
  const closeFiltersModal = () => {
    modalRef.current?.close();
  }
  const applyFilters = () => {
    if (filters) {
      page = 1
      setImages([])
      let params = {
        page,
        ...filters
      }
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search
      fetchImages(params, false);
    }
    console.log('apply filters');
    closeFiltersModal()
  }
  const resetFilters = () => {
    if (filters) {
      page = 1
      setFilters(null)
      setImages([])
      let params: any = {
        page,
      }
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search
      fetchImages(params, false);
    }
    closeFiltersModal()
  }
  const clearThisFilter = (filterName: string) => {
    let filterz = { ...filters };
    delete filterz[filterName];
    setFilters({ ...filterz })
    page = 1
    setImages([])
    let params = {
      page,
      ...filterz
    }
    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search
    fetchImages(params, false);
  }
  const handleChangeCategory = (category: string | null) => {
    setActiveCategory(category);
    clearSearch()
    setImages([])
    page = 1
    let params = {
      page,
      category,
      ...filters,
    }
    if (category) params.category = category;
    fetchImages(params, false);
  };
  const handleSearch = (text: string) => {
    console.log('search', text);
    setSearch(text)
    if (text.length > 2) {
      page = 1
      setImages([])
      setActiveCategory(null) // clear category when searching
      fetchImages({ page, q: text, ...filters }, false);
    }
    if (text == '') {
      // reset results
      page = 1;
      (searchInputRef?.current as any).clear()
      setImages([])
      setActiveCategory(null) // clear category when searching
      fetchImages({ page, ...filters });
    }
  };
  const clearSearch = () => {
    setSearch("");
    (searchInputRef?.current as any).clear()
    fetchImages({ page, });

  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={(styles.container, { paddingTop })}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pixels</Text>
        <Pressable onPress={openFiltersModal}>
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


        {/* filters */}

        {filters &&
          <View>
            <ScrollView horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}>
              {
                Object.keys(filters).map((key, index) => {
                  return (
                    <View key={key} style={styles.filterItem}>
                      {
                        key == "colors"
                          ? <View style={{ height: 20, width: 30, borderRadius: 7, backgroundColor: filters[key] }}></View>
                          : <Text style={styles.filterItemText}>{filters[key]}</Text>
                      }
                      <Pressable
                        style={styles.filterCloseIcon}
                        onPress={() => clearThisFilter(key)} >
                        <Ionicons
                          name="close"
                          size={14}
                          color={theme.colors.neutral(0.9)}
                        />
                      </Pressable>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>}


        {/* images */}
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>

        {/* loading */}


        <View style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}>
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>

      {/* filters modal */}

      <FiltersModal modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        onClose={closeFiltersModal} />
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
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.neutral(0.1),
    // padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.xs,
    padding: 8,
    gap: 10,
    paddingHorizontal: 10
  },
  filterItemText: {
    fontSize: hp(1.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 7,

  }
});

export default HomeScreen;
