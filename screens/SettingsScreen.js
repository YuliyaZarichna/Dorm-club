import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Color from '../constants/Colors';
import Str from '../constants/Strings';


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
                        <Text style={styles.logoutText}>{Str.LOGOUT}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

/**https://facebook.github.io/react-native/docs/platform-specific-code
 * Platform specific code, depends on the platform the header style will be different
 */
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
    },
    logoutText: {
        color: Color.ATTENTION,
        fontSize: 18
    }
})

export default SettingsScreen;