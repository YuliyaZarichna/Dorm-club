import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import str from '../../constants/Strings';
import Color from '../../constants/Colors';


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        
       return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <TextInput
                    placeholder={str.EMAIL}
                    placeholderTextColor="lightgrey"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()} // when enter the email
                    style={styles.input}
                />
    
                <TextInput
                    placeholder={str.PASSWORD}
                    placeholderTextColor="lightgrey"
                    returnKeyType="go"
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    style={styles.input}
                />
    
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>{str.LOGIN}</Text>
                </TouchableOpacity>
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },

    input: {
        height: 40,
        marginBottom: 20,
        borderColor: "rgba(255,255,255,0.7)",
        color: Color.BLACK,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color.LIGHTGRAY
    },

    buttonContainer: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        backgroundColor: Color.VIOLET
    },

    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: Color.WHITE
    },
})

export default LoginForm;