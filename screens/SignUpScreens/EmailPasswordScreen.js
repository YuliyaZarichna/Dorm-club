import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView, Button } from 'react-native';
import Color from '../../constants/Colors';
import Str from '../../constants/Strings';
import logo from "../../assets/images/logo2.png";
import * as SecureStore from 'expo-secure-store';

import getEnvVar from '../../environment';
const { apiURL } = getEnvVar();


class EmailPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            //password_confirmation: '',
            firstname: this.props.navigation.getParam('firstname'),
            lastname: this.props.navigation.getParam('lastname'),
            username: this.props.navigation.getParam('username'),
            selectedUniversity: this.props.navigation.getParam('university'),
            selectedCountry: this.props.navigation.getParam('country'),
            selectedBulding: this.props.navigation.getParam('building'),
            selectedSpecialization: this.props.navigation.getParam('specialization'),
        }
        console.log("selectedCountry", this.state.selectedCountry);
        console.log("selectedSpecialization", this.state.selectedSpecialization);

        /*       const selectedUniversity = this.props.navigation.getParam('university')
              const selectedSubject = this.props.navigation.getParam('subject')
              const selectedCountry = this.props.navigation.getParam('country')
              const building = this.props.navigation.getParam('building')
              const firstname = this.props.navigation.getParam('firstname')
              const lastname = this.props.navigation.getParam('lastname')
              const username = this.props.navigation.getParam('username') */
    }

    createUser = async () => {
        console.log("createUser");
        try {
            const response = await fetch(`${apiURL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    isTocken: true,
                    University: this.state.selectedUniversity,
                    Country: this.state.selectedCountry,
                    Dorm: this.state.selectedBulding,
                    //Specialization: this.state.selectedSpecialization
                }),
            })
            if (response.ok) {
                const res = await response.json();
                console.log("signup seccsses", res);
                await SecureStore.setItemAsync('secure_token', res.accessToken);
                await SecureStore.setItemAsync('user_id', JSON.stringify(res.id));
                this.handleNavigation()
            }
            else {
                alert("try again")
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    validateEmail = (text) => {
        console.log("state", this.state.email);
        //console.log("email", text);
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(text)
        /*       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (reg.test(text) === false) {
                  console.log("Email is not correct");
                  return false;
              } else { */
        /*       this.setState({
                  email: text
              }) */
        //}

    }


    handleSubmit = () => {
        //validate email
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            alert("Email is not correct");
            return false;
        }
        else {
            this.createUser();

        }
    }

    handleNavigation = () => {
        this.props.navigation.navigate({
            routeName: 'Verification',
            params: {
                university: this.props.navigation.getParam('university'),
                subject: this.props.navigation.getParam('subject'),
                country: this.props.navigation.getParam('country'),
                building: this.props.navigation.getParam('building'),
                firstname: this.props.navigation.getParam('firstname'),
                lastname: this.props.navigation.getParam('lastname'),
                username: this.props.navigation.getParam('username'),
                specialization: this.props.navigation.getParam('specialization'),
            }
        })
    }



    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior='position'
                    keyboardVerticalOffset={100}
                >
                    <View>
                        {/* <Text style={styles.title}>Welcome to Aristoteles Student Dormitory</Text> */}
                        <Image
                            style={styles.logo}
                            source={logo}
                        />

                        <Text style={styles.text}>Enter email address</Text>

                        <TextInput
                            //onChangeText={(text) => this.validateEmail(text)}
                            value={this.state.email}
                            returnKeyType="next"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            underlineColorAndroid='transparent'
                            placeholder={Str.EMAIL}
                            spellCheck={false}
                            autoCorrect={false}
                            style={styles.textInput}
                            onSubmitEditing={() => this.passwordInput.focus()} // when enter the email
                            onChangeText={(text) => (this.setState({ email: text }))}
                        //onBlur={ () => this.onBlur() }
                        >
                        </TextInput>
                        <Text style={styles.text}>Enter password</Text>
                        <TextInput
                            onChangeText={(password) => this.setState({ password })}
                            valoue={this.state.password}
                            underlineColorAndroid='transparent'
                            placeholder={Str.PASSWORD}
                            secureTextEntry
                            spellCheck={false}
                            autoCorrect={false}
                            style={styles.textInput}
                            ref={(input) => this.passwordInput = input}
                            style={styles.input}
                            minLength={1}
                        >
                        </TextInput>
                        {/*      <Text style={styles.text}>Repeat password</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                style={{ paddingBottom: 0 }}
                                onChangeText={(password_confirmation) => this.setState({ password_confirmation })}
                                value={this.state.password_confirmation}
                                underlineColorAndroid='transparent'
                                placeholder="Password"
                                spellCheck={false}
                                autoCorrect={false}
                            >
                            </TextInput>
                        </View> */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                                <Text style={styles.buttonText}>{Str.DONE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
EmailPasswordScreen.navigationOptions = {
    headerStyle: {
        elevation: 0,
    },
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    logo: {
        width: 250,
        height: 200,
        alignSelf: 'center'
    },

    text: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        color: Color.TROPICALRAINFOREST,
    },

    input: {
        height: 40,
        marginBottom: 20,
        width: "90%",
        alignSelf: 'center',
        borderColor: "rgba(255,255,255,0.7)",
        color: Color.BLACK,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color.LIGHTGRAY,
    },

    textInput: {
        height: 30,
        marginBottom: 20,
        width: "90%",
        alignSelf: 'center',
        borderColor: "rgba(255,255,255,0.7)",
        color: Color.BLACK,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color.LIGHTGRAY,
        textDecorationLine: 'none'
    },

    buttonContainer: {
        paddingTop: 20
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

export default EmailPasswordScreen;

// regex
//https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e