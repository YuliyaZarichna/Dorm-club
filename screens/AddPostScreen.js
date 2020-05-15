import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import Color from '../constants/Colors';
import Str from '../constants/Strings';
import * as SecureStore from 'expo-secure-store';
import { Keyboard } from 'react-native'
import getEnvVar from '../environment';
const { apiURL } = getEnvVar();

class AddPostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            title: '',
            text: '',
            userId: ''
        };
    }

    /** add new past */
    createPost = async () => {
        Keyboard.dismiss()
        try {
            const userId = await SecureStore.getItemAsync('user_id')
            this.setState({
                isLoading: true,
            });
            const response = await fetch(`${apiURL}/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: this.state.title,
                    text: this.state.text,
                    userId: userId
                }),
            })

            const resJson = await response.json();
            this.setState({
                isLoading: false
            })
            if (response.ok) {
                //sending new created post data to post page
                this.props.navigation.state.params.addNewPostToArray({
                    title: resJson.title,
                    text: resJson.text,
                    User: resJson.User,
                    createdAt: resJson.createdAt,
                    id: resJson.id
                });
                this.props.navigation.goBack();
            }
            else {
                alert("Post is not created, please try again!")
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.centered} >
                    <ActivityIndicator animating={true} size="large" />
                </View>
            )
        }
        return (
            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={10}>
                <View style={styles.containerView}>
                    <TextInput
                        placeholder={Str.POST_TITLE}
                        placeholderTextColor="lightgrey"
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        style={styles.input}
                        autoCorrect
                        returnKeyType="next"
                        multiline={true}
                    />
                    <TextInput
                        placeholder={Str.POST_DETAILS}
                        placeholderTextColor="lightgrey"
                        value={this.state.text}
                        onChangeText={(text) => this.setState({ text })}
                        style={styles.input}
                        autoCorrect
                        multiline={true}
                        spellCheck={true}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.createPost()}
                        disabled={!this.state.text || !this.state.title}
                    >
                        <Text style={styles.buttonText}>{Str.SUBMIT}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        )
    }
}

/**https://facebook.github.io/react-native/docs/platform-specific-code
 * Platform specific code, depends on the platform, the header style will be different
 */
AddPostScreen.navigationOptions = () => {
    return {
        headerTitle: 'Create Post',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerView: {
        marginTop: 20
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        borderBottomColor: Color.LIGHTGRAY
    },

    button: {
        width: "90%",
        alignSelf: "center",
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        backgroundColor: Color.TEAL,
    },

    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: Color.WHITE
    },

})

export default AddPostScreen;