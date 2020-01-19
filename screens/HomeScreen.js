import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, RefreshControl, ActivityIndicator, ColorPropType } from 'react-native';
import PostCard from '../components/Card';
import Modal from 'react-native-modal';
import getEnvVars from '../environment';
const { apiURL } = getEnvVars();
import * as SecureStore from 'expo-secure-store';
import Color from '../constants/Colors';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            isModalVisible: false,
            isLoading: false,
            isError: false,
            posts: [],
            currentEditPostcardId: null,
        }
    }

    // get all posts from DB 
    getAllPosts = async () => {
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
            // console.error(error);
        }
    }

    //delete by id 
    deletePostById = async (id) => {
        try {
            this.isLoading = true,

                await fetch(`${apiURL}/post/` + id, {
                    method: 'DELETE',
                })
                    .then(() => {
                        const index = this.state.posts.findIndex(item => item.id === id);
                        this.state.posts.splice(index, 1);
                        this.setState({
                            posts: this.state.posts
                        })
                    });
        }
        catch (err) {
            this.setState({ loading: false, err: true })
        }
    }

    componentDidMount() {
        this.getAllPosts();
    }

    onRefresh() {
        //Clear old data of the list
        this.setState({ posts: [] });
        //Call the Service to get the latest data
        this.getAllPosts();
    }

    renderModalContent = () => (
        <View>
            <View style={styles.modalContent}>
                <TouchableOpacity>
                    <Text onPress={this.handleDeletePostCard}>Hide Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    toggleModal = (cardId) => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            currentEditPostcardId: cardId
        });

    };

    addNewPostToArray = (newPost) => {

        console.log("addNewPostToArray item", newPost)

        this.setState({
            //isLoading: true,
            posts: [newPost, ...this.state.posts],
        })
        console.log("addNewPostToArray state", this.state.posts)
    }

    onPress = () => {
        this.props.navigation.navigate({
            routeName: "AddPost",
            params: {
                getAllPosts: () => this.getAllPosts(),
                addNewPostToArray: this.addNewPostToArray
            }
        });
        //this.props.navigation.navigate('AddPost', { onNavigateBack: this.getAllPosts})} 
    };
    handleDeletePostCard = () => {
        this.deletePostById(this.state.currentEditPostcardId)
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

export default HomeScreen;


// add round button
// https://stackoverflow.com/questions/49509604/fixed-button-over-a-scrollview 

//refreshing data
//https://snack.expo.io/@dpesmdr/refreshcontrol-example


// is Mounted
//https://github.com/material-components/material-components-web-react/issues/434