import {View, StyleSheet} from 'react-native';
import {MasonryFlashList} from '@shopify/flash-list';
import ImageCard from './ImageCard';
import {getColumnCount, wp} from '@/helpers/common';
import React from 'react';
import {ImageType} from '@/types';

type Props = {
  images: ImageType[];
  router: any;
};

const ImageGrid: React.FC<Props> = ({images, router}) => {
  const columns = getColumnCount();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        renderItem={({item, index}) => (
          <ImageCard
            item={item}
            index={index}
            columns={columns}
            router={router}
          />
        )}
        estimatedItemSize={200}
        contentContainerStyle={styles.listContainer}
        // initialNumToRender={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainer: {
    paddingHorizontal: wp(4),
  },
});

export default ImageGrid;
