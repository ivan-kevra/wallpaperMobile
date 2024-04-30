import { StyleSheet, Text } from 'react-native';
import React, { useMemo } from 'react';
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

type Props = {
    modalRef: any
};
const FiltersModal = ({ modalRef }: Props) => {

    const snapPoints = useMemo(() => ['75%'], []);

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={CustomBackdrop}
        >
            <BottomSheetView style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
            </BottomSheetView>
        </BottomSheetModal>
    );
};


const CustomBackdrop = ({ animatedIndex, style }: any) => {
    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolation.CLAMP
        )
        return {
            opacity
        }
    })

    const containerStyle = [StyleSheet.absoluteFill, style, styles.overlay, containerAnimatedStyle]
    return (
        <Animated.View style={containerStyle}>
            <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={10} experimentalBlurMethod='dimezisBlurView' />
        </Animated.View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});

export default FiltersModal;
