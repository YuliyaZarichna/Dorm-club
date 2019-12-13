import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import color from '../constants/Colors';
import str from '../constants/Strings';


class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container} >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View tyle={styles.welcomeContainer}>

                    </View>
                    <Text style={styles.welcomeText}>Welocme to Aristo!</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>{str.DONE}</Text>
                    </TouchableOpacity>

                </ScrollView>

            </View>
        );
    }
}
/* HomeScreen.navigationOptions = {
    header: null,
} */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.WHITE,
        paddingTop: 20
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeText: {
        alignSelf: 'center',
        paddingBottom: 20
    },

    buttonContainer: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        backgroundColor: color.VIOLET
    },

    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: color.WHITE
    },
})


export default WelcomeScreen; 