import { theme } from '@/constants/theme';
import { capitalize, hp } from '@/helpers/common';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SectionViewProps = {
    title: string
    content: JSX.Element
}
export const SectionView = ({ title, content }: SectionViewProps) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View>
                {content}
            </View>
        </View>
    )
}


type CommonFilterRowProps = {
    data: any
    filterName: string
    filters: any
    setFilters: any
}
export const CommonFilterRow = ({ data, filterName, filters, setFilters }: CommonFilterRowProps) => {

    const onSelect = (item: string) => {
        setFilters({ ...filters, [filterName]: item })
    }

    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item: any, index: number) => {
                    let isActive = filters && filters[filterName] === item
                    let backgroundColor = isActive ? theme.colors.neutral(0.7) : theme.colors.white
                    let color = isActive ? theme.colors.white : theme.colors.neutral(0.7)
                    return (
                        <Pressable
                            key={index}
                            onPress={() => onSelect(item)}
                            style={[styles.outlinedButton, { backgroundColor }]}>
                            <Text style={[styles.outlinedButtonText, { color }]}>{capitalize(item)}</Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

export const ColorFilter = ({ data, filterName, filters, setFilters }: CommonFilterRowProps) => {

    const onSelect = (item: string) => {
        setFilters({ ...filters, [filterName]: item })
    }

    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item: any, index: number) => {
                    let isActive = filters && filters[filterName] === item
                    let borderColor = isActive ? theme.colors.neutral(0.7) : theme.colors.white
                    return (
                        <Pressable
                            key={index}
                            onPress={() => onSelect(item)}
                        >
                            <View style={[styles.colorWrapper, { borderColor }]}>
                                <View style={[styles.color, { backgroundColor: item }]} />
                            </View>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}



const styles = StyleSheet.create({
    sectionContainer: {
        gap: 8
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.neutral(0.8),
    },
    flexRowWrap: {
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    outlinedButton: {
        padding: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.xs,
        borderCurve: 'continuous',
    },
    outlinedButtonText: {},
    color: {
        width: 40,
        height: 30,
        borderRadius: theme.radius.sm - 3,
        borderCurve: 'continuous',
    },
    colorWrapper: {
        padding: 3,
        borderRadius: theme.radius.sm,
        borderWidth: 2,
        borderCurve: 'continuous',
    },
});

