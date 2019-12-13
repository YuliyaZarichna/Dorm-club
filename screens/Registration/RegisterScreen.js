import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView } from 'react-native';
import Color from '../../constants/Colors';
import str from '../../constants/Strings';
import RegisterForm from './RegisterForm'



class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    updateUser = (user) => {
        if (user != '0') {
            this.setState({ user: user })
        }
    }
    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior='position'
                >
                    <View style={styles.regiter}>
                        <StatusBar
                        //barStyle="light-content"
                        />
                        <Text style={styles.text}>{str.GREETING}</Text>
                        <RegisterForm navigation={this.props.navigation} />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
RegisterScreen.navigationOptions = {
    headerTitle: 'Set up',
    headerStyle: {
        backgroundColor: Color.VIOLET
    },
    headerTintColor: Color.WHITE
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 40,
    },
    
    register: {
        alignItems: 'center',
        flexGrow: 1,
    },

    text: {
        textAlign: 'center'
    },
})

export default RegisterScreen;