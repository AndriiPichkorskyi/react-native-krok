import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../../ThemedText";
import { ChallengeItem, ChallengeItemProps } from "../ChallengeItem";

export type ChallengeItemListProps = {
    title: string,
    stats: ChallengeItemProps[]
}

export function ChallengeItemList({ title, stats }: ChallengeItemListProps) {
    return (<View style={styles.container}>
        <View style={styles.header}>
            <ThemedText type="h3">{title}</ThemedText>
        </View>
        <ScrollView style={styles.list} horizontal={true} contentContainerStyle={{ gap: 16 }}>
            {stats.map(item => <ChallengeItem {...item} />)}
        </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 12,
    },
    container: {
        flexDirection: "column",
    },
    list: {
        // flexDirection: "row"
    }
})