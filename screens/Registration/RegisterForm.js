import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView } from 'react-native';
import color from '../../constants/Colors';
import str from '../../constants/Strings';



class RegisterForm extends React.Component {
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
            <View>
                <View style={styles.input}>
                    <Picker
                        selectedValue={this.state.user}
                        onValueChange={this.updateUser}
                    >
                        <Picker.Item label="Select the universities" value='0' color="lightgrey" />
                        <Picker.Item label="HTW" value='1' />
                        <Picker.Item label="TU" value='2' />
                        <Picker.Item label="FU" value='3' />
                    </Picker>
                </View>
                <View style={styles.input}>
                    <Picker
                        selectedValue={this.state.user}
                        onValueChange={this.updateUser}
                    >
                        <Picker.Item label="Select the subject" value='0' color="lightgrey" />
                        <Picker.Item label="Medieninformatik" value='1' />
                        <Picker.Item label="Elektrotechnik" value='2' />
                        <Picker.Item label="Math" value='3' />
                    </Picker>
                </View>
                <View style={styles.input}>
                    <Picker
                        selectedValue={this.state.user}
                        onValueChange={this.updateUser}
                    >
                        <Picker.Item label="Where are you from?" value='0' color="lightgrey" />
                        <Picker.Item label="Albania" value='1' />
                        <Picker.Item label="Turkmenistan" value='2' />
                        <Picker.Item label="Uktaine" value='3' />
                    </Picker>
                </View>
                <View style={styles.input}>
                    <Picker
                        selectedValue={this.state.user}
                        onValueChange={this.updateUser}
                    >
                        <Picker.Item label="What building do you live in?" value='0' color="lightgrey" />
                        <Picker.Item label="Albania" value='1' />
                        <Picker.Item label="Turkmenistan" value='2' />
                        <Picker.Item label="Uktaine" value='3' />
                    </Picker>
                </View>
                <TextInput
                    placeholder='enter your username'
                    placeholderTextColor="lightgrey"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => console.log("building")} // when enter the email
                    style={styles.input}
                />
                <View style={styles.input}>
                    <Picker
                        selectedValue={this.state.user}
                        onValueChange={this.updateUser}
                    >
                        <Picker.Item label="Choose an avatar" value='0' color="lightgrey" />
                        <Picker.Item label="Albania" value='1' />
                        <Picker.Item label="Turkmenistan" value='1' />
                        <Picker.Item label="Uktaine" value='2' />
                    </Picker>
                </View>
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
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Welcome')}>
                    <Text style={styles.buttonText}>{str.DONE}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    input: {
        width: '90%',
        height: 40,
        marginBottom: 20,
        color: color.BLACK,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.LIGHTGRAY,
        justifyContent: 'center',
        alignSelf: "center",
    },
    text: {
        textAlign: 'center'
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

export default RegisterForm;