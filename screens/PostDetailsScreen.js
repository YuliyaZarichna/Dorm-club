import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, TextInput, KeyboardAvoidingView } from 'react-native';
import getEnvVars from '../environment';
import { HeaderTitle } from 'react-navigation-stack';
const { apiURL } = getEnvVars();
import Moment from 'react-moment';
import { Card, Divider, Avatar, Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import Color from '../constants/Colors';




class PostDetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            postData: [],
            postComments: [],
            postId: this.props.navigation.getParam('postId'),
            postTitle: this.props.navigation.getParam('postTitle'),
            postText: this.props.navigation.getParam('postText'),
            createdAt: this.props.navigation.getParam('createdAt'),
            postUserName: this.props.navigation.getParam('postUserName'),
        }
    }

    componentDidMount() {
        this.getPostDetails(this.state.postId);
    }

    getPostDetails = async (id) => {
        //console.log("fetPOstDetails");
        try {
            this.setState({
                isLoading: true,
            });
            const response = await fetch(`${apiURL}/post/` + id, {
                method: 'GET',
                headers: {
                    //'access-token': token,
                    'Content-Type': 'application/json',
                },
            })
            this.setState({
                isLoading: false
            })
            const res = await response.json();
            console.log("get post details res", res);
            if (response.ok) {
                this.setState({
                    postData: res,
                    postComments: res.Comments
                })
            }
            else {
                alert("Loading post failed!")
            }
        } catch (error) {
            console.error(error);
        }
    }

    addCommentToPost = async () => {
        try {
            this.setState({
                isLoading: true
            })
            const userId = await SecureStore.getItemAsync('user_id')
            const postId = this.props.navigation.getParam('postId')
            const response = await fetch(`${apiURL}/comment`, {
                method: 'POST',
                headers: {
                    //Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: this.state.commentText,
                    UserId: userId,
                    PostId: postId
                })
            })
            this.setState({
                isLoading: false
            })
            const res = await response.json();
            console.log("comment res", res);
            if (response.ok) {
                this.setState({
                    postData: res,
                    postComments: res.Comments
                })
            }
            else {
                alert("Comment is not added. Try again.")
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    render() {
        const postComments = this.state.postComments

        if (this.state.isLoading) {
            return (
                <View style={styles.centered} >
                    <ActivityIndicator animating={true} size="large" />
                    <Text>Loading</Text>
                </View>
            )
        }
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}
                keyboardVerticalOffset={90}
                behavior='height'
            >
                <ScrollView scrollEnabled={true}>
                    <View style={styles.container}>
                        <Card>
                            <View style={styles.header}>
                                <Avatar size='medium' rounded />
                                <Text style={styles.titleText}>{this.state.postTitle}</Text>
                            </View>
                            <View style={styles.header}>
                                <Text style={styles.username} >by {this.state.postUserName}</Text>
                                <Moment style={styles.moment} element={Text} fromNow>{this.state.createdAt}</Moment>
                            </View>
                            <Divider style={styles.divider} />
                            <View>
                                <Text style={styles.mainText}>{this.state.postText}</Text>
                            </View>
                        </Card>
                    </View>

                    {/* Comment Section */}
                    <View style={styles.commentContainer}>
                        {postComments.map((item, i) => (
                            <View key={i}>
                                <View style={styles.header}>
                                    <Avatar size='small' rounded />
                                    <Text style={styles.commentUsername}>{item.User.username}</Text>
                                    <View style={styles.modalButton}>
                                        <TouchableOpacity
                                            //onPress={() => this.props.openModal(this.props.id)}  // in parameter send props about each card to delete 
                                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
                                            <Ionicons name={Platform.OS === 'android' ? 'md-close' : 'ios-close'} size={22} color='grey' />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Moment style={styles.momentComment} element={Text} fromNow>{item.createdAt}</Moment>
                                <Text style={styles.commentText}>{item.text}</Text>
                                <Divider style={styles.divider} />
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Add Comment Section */}
                <View style={styles.addCommentContainer}>
                    <TextInput
                        style={styles.addComment}
                        placeholder='Add comment'
                        multiline={true}
                        onChangeText={(text) => { this.setState({ commentText: text }) }}
                        value={this.state.commentText}
                        spellCheck={true}
                    />
                    <TouchableOpacity onPress={() => this.addCommentToPost()}>
                        <Ionicons
                            style={styles.sendIcon}
                            size={28}
                            name={Platform.OS === 'android' ? 'md-send' : 'ios-send'}
                            disabled={!this.state.commentText}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

//from video
PostDetailsScreen.navigationOptions = (navData) => {
    const title = navData.navigation.getParam('postTitle')
    return {
        headerTitle: title,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL,
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 20
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    username: {
        marginLeft: 70,
        marginRight: 15,
        color: 'grey'
    },

    titleText: {
        fontSize: 24,
        paddingLeft: 20,
    },
    modalButton: {
        position: 'absolute',
        right: 5
    },
    moment: {
        color: 'grey'
    },
    mainText: {
        paddingBottom: 15
    },
    divider: {
        marginBottom: 15,
        marginTop: 15,
    },
    commentUsername: {
        marginLeft: 10,
        marginRight: 15,
        color: 'grey'
    },


    commentContainer: {
        marginLeft: 20,
        textAlignVertical: 'center',
        width: '90%'
    },
    commentText: {
        marginLeft: 10,
        justifyContent: 'flex-end'
    },

    momentComment: {
        color: 'grey',
        marginLeft: 40,
        marginBottom: 20
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


});


export default PostDetailsScreen;


// object itertion