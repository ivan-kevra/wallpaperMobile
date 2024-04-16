import {Text, View} from 'react-native';

type Props = {
  item: string;
};
const ImageCard = ({item}: Props) => {
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
};

export default ImageCard;
