import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import color from '../constants/Colors';


export default function ProfileScreen() {

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <Text>Hi there in is your profile</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.VIOLET,
    },
    contentContainer: {
        paddingTop: 30,
    },
})