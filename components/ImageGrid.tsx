import {View} from 'react-native';
import {MasonryFlashList} from '@shopify/flash-list';
import ImageCard from './ImageCard';

type Props = {
  images: string[];
};

const ImageGrid = ({images}: Props) => {
  return (
    <View>
      <MasonryFlashList
        data={images}
        numColumns={2}
        renderItem={({item}) => <ImageCard item={item} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

// const styles = StyleSheet.create({});

export default ImageGrid;
