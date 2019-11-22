import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

export default function MessageScreen() {

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <Text>Message screen view</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
    contentContainer: {
        paddingTop: 30,
    },
})