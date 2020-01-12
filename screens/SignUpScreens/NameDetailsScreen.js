import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView, Button } from 'react-native';
import Color from '../../constants/Colors';
import str from '../../constants/Strings';
import logo from "../../assets/images/logo.png";


class NameDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: ''
        }
        const university = this.props.navigation.getParam('university')
        //console.log("Namedetails", university);
        const subject = this.props.navigation.getParam('subject')
        //console.log(university);
        //console.log("Namedetails", subject);

    }

    handleNavigation = () => {
        this.props.navigation.navigate({
            routeName: 'EmailPassword',
            params: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                country: this.props.navigation.getParam('country'),
                building: this.props.navigation.getParam('building'),
                university: this.props.navigation.getParam('university'),
                subject: this.props.navigation.getParam('subject')
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
                    key
                >
                    <View>
                        {/* <Text style={styles.title}>Welcome to Arisstoteles Student Dormitory</Text> */}
                        <Image
                            style={styles.logo}
                            source={logo}
                        />

                        <Text style={styles.text}>Enter Firstname</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                style={{ paddingBottom: 0 }}
                                onChangeText={(name) => (this.setState({ firstname: name }))}
                                value={this.state.firstname}
                                underlineColorAndroid='transparent'
                                placeholder="firstname"
                                spellCheck={false}
                                autoCorrect={false}
                            >
                            </TextInput>
                        </View>
                        <Text style={styles.text}>Enter Lastname</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                style={{ paddingBottom: 0 }}
                                onChangeText={(name) => (this.setState({ lastname: name }))}
                                value={this.state.lastname}
                                underlineColorAndroid='transparent'
                                placeholder="lastname"
                                spellCheck={false}
                                autoCorrect={false}
                            >
                            </TextInput>
                        </View>
                        <Text style={styles.text}>Enter your username, will be visible to other users</Text>

                        <View style={styles.textInput}>
                            <TextInput
                                style={{ paddingBottom: 0 }}
                                onChangeText={(name) => (this.setState({ username: name }))}
                                value={this.state.username}
                                underlineColorAndroid='transparent'
                                placeholder="username"
                                spellCheck={false}
                                autoCorrect={false}
                            >
                            </TextInput>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={this.handleNavigation}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
NameDetailsScreen.navigationOptions = {
    headerStyle: {
        elevation: 0,
    },
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        color: "green",
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
        backgroundColor: Color.VIOLET,
    },

    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: Color.WHITE
    },
})

export default NameDetailsScreen;