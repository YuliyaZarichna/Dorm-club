import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
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
            firstname: this.props.navigation.getParam('firstname'),
            lastname: this.props.navigation.getParam('lastname'),
            username: this.props.navigation.getParam('username'),
            selectedUniversity: this.props.navigation.getParam('university'),
            selectedCountry: this.props.navigation.getParam('country'),
            selectedBulding: this.props.navigation.getParam('building'),
            selectedSpecialization: this.props.navigation.getParam('specialization'),
        }
    }

    /**Create a user */
    createUser = async () => {
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
            /**when a response is successful get token and save it in secure store,
             * save user id in secure store */
            if (response.ok) {
                const resJson = await response.json();
                await SecureStore.setItemAsync('secure_token', resJson.accessToken);
                await SecureStore.setItemAsync('user_id', JSON.stringify(resJson.id));
                this.handleNavigation()
            }
            else {
                alert("Seems like a user with email already exists, try again!")
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    /**Email validation
     * https://stackoverflow.com/questions/43676695/email-validation-react-native-returning-the-result-as-invalid-for-all-the-e*/
    handleSubmit = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false) {
            alert("Email is not correct");
            return false;
        }
        else {
            this.createUser();
        }
    }

    /** Handle navigation to the next screen. 
     * Transition all data to the next screen*/
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
                        <Image style={styles.logo} source={logo} />
                        <Text style={styles.text}>{Str.ENTEREMAIL}</Text>
                        <TextInput
                            value={this.state.email}
                            returnKeyType="next"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            underlineColorAndroid='transparent'
                            placeholder={Str.EMAIL}
                            spellCheck={false}
                            autoCorrect={false}
                            style={styles.input}
                            onChangeText={(text) => (this.setState({ email: text }))}
                        >
                        </TextInput>

                        <Text style={styles.text}>{Str.ENTERPSW}</Text>
                        <TextInput
                            onChangeText={(password) => this.setState({ password })}
                            valoue={this.state.password}
                            underlineColorAndroid='transparent'
                            placeholder={Str.PASSWORD}
                            secureTextEntry
                            spellCheck={false}
                            autoCorrect={false}
                            style={styles.input}
                            minLength={1}
                        >
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.handleSubmit}
                                disabled={!this.state.email || !this.state.password}>
                                <Text style={styles.buttonText}>{Str.DONE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

/**Remove header */
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
        textDecorationLine: 'none'
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
