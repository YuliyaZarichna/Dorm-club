import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import Color from '../constants/Colors';
import str from '../constants/Strings';
import * as SecureStore from 'expo-secure-store';

import getEnvVars from '../environment';
const { apiURL } = getEnvVars();

class AddPostScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            title: '',
            text: '',
            userId: ''
        };
    }

    UNSAFE_componentWillMount() {
        this._isMounted = false;
    }

    createPost = async () => {
        try {
            const userId = await SecureStore.getItemAsync('user_id')
            this._isMounted = true;
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

            const res = await response.json();
            console.log("res create Post", res);
            this.setState({
                isLoading: false
            })
            if (response.ok) {
                //sending new created post data to home page
                this.props.navigation.state.params.addNewPostToArray({
                    title: res.title,
                    text: res.text,
                    User: res.User,
                    createdAt: res.createdAt,
                    id: res.id
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

    /*  componentDidMount() {
         this.createPost();
     } */

    componentWillUnmount() {
        //this.props.navigation.state.params.getAllPosts();
        //this.props.navigation.state.params.addNewPostToArray(this.state.newPost);
    }

    submitCreatePost = async () => {
        console.log("combinedFunctionOnSubmit");
        const userId = await SecureStore.getItemAsync('user_id')
        this.createPost();
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
            <View style={styles.container}>
                <TextInput
                    placeholder={str.POST_TITLE}
                    placeholderTextColor="lightgrey"
                    value={this.state.title}
                    onChangeText={(title) => this.setState({ title })}
                    style={styles.input}
                    autoCorrect
                    returnKeyType="next"
                    multiline={true}
                />
                <TextInput
                    placeholder={str.POST_DETAILS}
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
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
AddPostScreen.navigationOptions = navData => {
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

//https://medium.com/@KPS250/creating-an-accordion-in-react-native-f313748b7b46

// to prevent an error - can't perform a react state update on an unmounted component. this is a no-op
//https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component


//on navigate back, refresh the page
//https://stackoverflow.com/questions/50921080/react-native-reload-screen-a-in-back-action