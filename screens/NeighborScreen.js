import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

export default function NeightborScreen() {
 
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View tyle={styles.welcomeContainer}>

                    </View>
                    <Text>Neightbor screen view</Text>

                </ScrollView>

            </View>
        );
}

/* HomeScreen.navigationOptions = {
    header: null,
} */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
})