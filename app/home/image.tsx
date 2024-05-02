import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BlurView} from 'expo-blur';
import {hp, wp} from '@/helpers/common';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Image} from 'expo-image';
import {theme} from '@/constants/theme';
import {Entypo, Octicons} from '@expo/vector-icons';
import Animated, {FadeInDown} from 'react-native-reanimated';

const ImageScreen = () => {
  const router = useRouter();
  const item: any = useLocalSearchParams();
  const [status, setStatus] = useState('loading');
  let uri = item?.webformatURL;

  console.log(item);

  const getSize = () => {
    const aspectRatio = item?.imageWidth / item?.imageHeight;

    const maxWidth = Platform.OS === 'web' ? wp(50) : wp(92);

    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      calculatedHeight = calculatedHeight * aspectRatio;
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const onLoad = () => {
    setStatus('');
  };

  const handleDownloadImage = async () => {};

  const handleShareImage = async () => {};

  return (
    <BlurView style={styles.container} tint="dark" intensity={60}>
      <View style={getSize()}>
        <View>
          {status === 'loading' && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Octicons name="x" size={24} color={'white'} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          <Pressable style={styles.button} onPress={handleDownloadImage}>
            <Octicons name="download" size={24} color={'white'} />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          <Pressable style={styles.button} onPress={handleShareImage}>
            <Entypo name="share" size={22} color={'white'} />
          </Pressable>
        </Animated.View>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  },
});

export default ImageScreen;
