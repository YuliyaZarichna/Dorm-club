import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import PostCard from '../components/Card';
import Modal from 'react-native-modal';
import getEnvVar from '../environment';
const { apiURL } = getEnvVar();
import * as SecureStore from 'expo-secure-store';
import Color from '../constants/Colors';


class PostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            isModalVisible: false,
            isLoading: false,
            isError: false,
            posts: [],
            postId: null,
        }
    }

    /** call getAllPosts method when on page load */
    componentDidMount() {
        this.getAllPosts();
    }

    /** get all the posts  */
    getAllPosts = async () => {
        console.log("getAllPosts");
        try {
            var token = await SecureStore.getItemAsync('secure_token');
            this.setState({
                isLoading: true,
            });

            const response = await fetch(`${apiURL}/posts`, {
                method: 'GET',
                headers: {
                    'access-token': token,
                    'Content-Type': 'application/json',
                },
            });
            const resJson = await response.json();
            if (response.ok) {
                this.setState({
                    refreshing: false,
                    isLoading: false,
                    posts: resJson
                });
            }
            else {
                alert("Something went wrong!")
            }
        }
        catch (error) {
            this.setState({
                isError: true
            });
        }
    }

    /** delete post by id */
    deletePostById = async (id) => {
        try {
            this.isLoading = true,
                await fetch(`${apiURL}/post/` + id, {
                    method: 'DELETE',
                })
            /** check if element is in array, 
             * splice - remove fisrt matching item from array */
            const index = this.state.posts.findIndex(item => item.id === id);
            this.state.posts.splice(index, 1);
            this.setState({
                posts: this.state.posts
            })
        }
        catch (err) {
            this.setState({ loading: false, err: true })
        }
    }

    /** refresh the page when Swipe Down  
    * https://snack.expo.io/@dpesmdr/refreshcontrol-example
    */
    onRefresh() {
        //Clear old data of the list
        this.setState({ posts: [] });
        //Call the Service to get the latest data
        this.getAllPosts();
    }

    /** open a modal window with the delete function */
    renderModalContent = () => (
        <View>
            <View style={styles.modalContent}>
                <TouchableOpacity>
                    <Text onPress={this.handleDeletePostCard}>Hide Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    /** open/close a modal window for post and get its id  */
    toggleModal = (postId) => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            postId: postId
        });
    };

    /** add a new post to an array, when a user creates a new post, 
     * data comes from AddPostScreen */
    addNewPostToArray = (newPost) => {
        this.setState({
            posts: [newPost, ...this.state.posts],
        })
    }

    /** on button click go to AddPost page */
    onPress = () => {
        this.props.navigation.navigate({
            routeName: "AddPost",
            params: {
                getAllPosts: () => this.getAllPosts(),
                addNewPostToArray: this.addNewPostToArray
            }
        });
    };

    /** delete post and manage modal */
    handleDeletePostCard = () => {
        this.deletePostById(this.state.postId)
        this.toggleModal();
    }

    render() {
        if (this.state.isError) {
            return (
                <View style={styles.centered} >
                    <Text>An error occured</Text>
                </View>
            )
        }

        if (this.state.isLoading) {
            return (
                <View style={styles.centered} >
                    <ActivityIndicator animating={true} size="large" />
                    <Text>Loading</Text>
                </View>
            )
        }

        if (!this.state.isLoading && this.state.posts === 0) {
            return (
                <View style={styles.centered} >
                    <Text>No data found</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Modal isVisible={this.state.isModalVisible}
                    backdropOpacity={.50}
                    backdropTransitionOutTiming={700}
                    onBackdropPress={this.toggleModal}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver={true}>
                    {this.renderModalContent()}
                </Modal>

                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => (String(item.id))}
                    renderItem={({ item }) => (
                        <PostCard
                            date={item.createdAt}
                            text={item.text}
                            user={item.User.username}
                            title={item.title}
                            openModal={this.toggleModal}
                            id={item.id}
                            navigation={this.props.navigation}
                        />
                    )}

                    /** refresh control used for the pull to refresh*/
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.onPress}>
                        <Text style={styles.buttonTextStyle}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 15,
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    /** Add round button
        https://stackoverflow.com/questions/49509604/fixed-button-over-a-scrollview 
    */
    button: {
        backgroundColor: Color.PASTELRED,
        width: 60,
        height: 60,
        borderRadius: 33,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        flex: 1,
    },

    buttonTextStyle: {
        color: 'white',
        fontSize: 45,
        marginBottom: 6
    },

    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
})

export default PostScreen;
