import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Color from '../constants/Colors';
import Str from '../constants/Strings';


class WelcomeScreen extends React.Component {
    render() {
        const username = this.props.navigation.getParam('username')
        return (
            <View style={styles.container} >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.helloText}>Hello {username}</Text>
                        <Text style={styles.welcomeText}>Welcome to Aristo DC</Text>
                        <Text style={styles.enjoyText}>Enjoy your stay in students dormitory</Text>
                        <Text style={styles.infoAristo}>There are around 800 people living in Aristotelessteig</Text>
                        <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('Home') }}>
                            <Text style={styles.buttonText}>{Str.DONE}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.WHITE,
        paddingTop: 20,
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    helloText: {
        fontSize: 30,
        color: Color.TROPICALRAINFOREST

    },
    welcomeText: {
        paddingBottom: 20,
        fontSize: 25,
        color: Color.TROPICALRAINFOREST
    },
    enjoyText: {
        paddingBottom: 20,
        fontSize: 18,
    },
    infoAristo: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 18,
        textAlign: 'center',

    },
    info: {
        paddingBottom: 20,
        fontSize: 18,
        color: Color.TEAL
    },

    button: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        backgroundColor: Color.TROPICALRAINFOREST,
    },

    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: Color.WHITE
    },
})


export default WelcomeScreen; 