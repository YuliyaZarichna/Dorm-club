import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView } from 'react-native';
import color from '../../constants/Colors';
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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