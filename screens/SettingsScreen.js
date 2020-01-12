import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Colors';
import str from '../constants/Strings';


class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <TouchableOpacity style={styles.logoutContainer} onPress={() => this.props.navigation.navigate('FAQs')}>
                        <Ionicons style={styles.FAQIcon} name='md-information-circle-outline' size={26} />
                        <Text style={styles.FAQText}>FAQ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutContainer} onPress={() => this.props.navigation.navigate('Login')}>
                        <Ionicons style={styles.logoutIcon} name='md-log-out' size={26} />
                        <Text style={styles.logoutText}>{str.LOGOUT}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

//from video
SettingsScreen.navigationOptions = () => {
    return {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 30,
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },

    FAQIcon: {
        marginRight: 20,
        marginLeft: 20,
        color: 'black',
    },
    FAQText: {
        color: 'black',
        fontSize: 18
    },
    logoutIcon: {
        marginRight: 20,
        marginLeft: 20,
        color: Color.ATTENTION,
        // bottom: 30
    },
    logoutText: {
        color: Color.ATTENTION,
        fontSize: 18
    }
})

export default SettingsScreen;