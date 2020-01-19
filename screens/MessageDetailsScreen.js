import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Color from '../constants/Colors';
import str from '../constants/Strings';
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat'
import getEnvVars from '../environment';
const { apiURL } = getEnvVars();



class MessageDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
        const title = this.props.navigation.getParam('username')
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }



    onSend = async (messages = []) => {
        try {
            const response = await fetch(`${apiURL}/auth/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: this.state.messages,
                })
            })
            const resJson = await response.json();

            if (response.ok) {
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, messages),
                }))
            }
            else {
                alert('wrong username or password, try again')
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {

        return (
            <KeyboardAvoidingView style={{ flex: 1 }}
                keyboardVerticalOffset={90}
                behavior='height'
            >
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </KeyboardAvoidingView>
        );
    }
}

MessageDetailsScreen.navigationOptions = (navData) => {
    const title = navData.navigation.getParam('username')
    return {
        headerTitle: title,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 20
    },
    header: {
        fontSize: 20,
        textAlign: 'center'
    },

    addCommentContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 10
    },

    addComment: {
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: 'grey',
        minHeight: 35,
        width: '80%',
        maxHeight: 80,
        paddingHorizontal: 10,
    },
    sendIcon: {
        marginLeft: 10,
        textAlignVertical: 'center',
        color: Color.PASTELRED
    }
})

export default MessageDetailsScreen;