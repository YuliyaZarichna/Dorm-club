import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, RefreshControl, ActivityIndicator, ColorPropType } from 'react-native';
import PostCard from '../components/Card';
import Modal from 'react-native-modal';
import getEnvVars from '../environment';
const { apiURL } = getEnvVars();
import * as SecureStore from 'expo-secure-store';
import { SearchBar } from 'react-native-elements';
import Color from '../constants/Colors';




class HomeScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            isModalVisible: false,
            isLoading: false,
            isError: false,
            posts: [],
            currentEditPostcardId: null, 
            search: '',
        }
    }

    UNSAFE_componentWillMount() {
        this._isMounted = false;
        //this.getAllPosts();
    }

    // get all posts from DB 
    getAllPosts = async () => {
        try {
            var token = await SecureStore.getItemAsync('secure_token');
            this._isMounted = true;
            this.setState({
                isLoading: true,
            });
            
            const res = await fetch(`${apiURL}/posts`, {
                method: 'GET',
                headers: {
                  'access-token': token,
                  'Content-Type': 'application/json',
                },
            });
            const resJson = await res.json();
            if (this._isMounted) {
                this.setState({
                    refreshing: false,
                    isLoading: false,
                    posts: resJson
                });
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
            this._isMounted = true;
         
            this.isLoading= true,
           
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

    componentWillUnmount() {
     //   this.setState({ isModalVisible: false })
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

    updateSearch = search => {
        this.setState({ search });
      };

    render() {

        console.log("render");

        if(this.state.isError) {
            return(
                <View style={styles.centered} >
                    <Text>An error occured</Text>
                </View>
            )}

        if (this.state.isLoading) {
            return (
                <View style={styles.centered} >
                    <ActivityIndicator animating={true} size="large"/>
                    <Text>Loading</Text>
                </View>
            )}

        if(!this.state.isLoading  && this.state.posts === 0){
            return (
                <View style={styles.centered} >
                    <Text>No data found</Text>
                </View>
            )
        }
        return (
            <>
             {/*   <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={this.state.search}
                containerStyle={{backgroundColor: 'transparent', paddingTop: 25}}
                inputContainerStyle={{backgroundColor:'grey '}}
                inputStyle={{backgroundColor:'white', borderColor:'grey',  borderWidth: 0.5}}
                searchIcon={{color:'white'}}
                clearIcon={{color:'white'}}             
                /> */}
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
                    {/*<TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('AddPost', { onNavigateBack: this.getAllPosts})}>*/}
                    <TouchableOpacity style={styles.button} onPress={this.onPress}>
                        <Text style={styles.buttonTextStyle}>+</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

HomeScreen.navigationOptions = {
    
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 10,
    },
    
    search: {
        backgroundColor: 'green'
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

    /* posts: [
                {
                    id: 1,
                    date: '11.22.2019',
                    user: 'Ivan',
                    title: 'Sell',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity. If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity'
                },
                {
                    id: 2,
                    date: '11.22.2019',
                    user: 'Fin',
                    title: 'Sell',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity.'
                },
                {
                    id: 3,
                    date: '11.22.2019',
                    user: 'Coco',
                    title: 'Offer',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity.'
                }, {
                    id: 4,
                    date: '11.22.2019',
                    user: 'Badger',
                    title: 'Buy',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity.'
                }, {
                    id: 5,
                    date: '11.22.2019',
                    user: 'Volya',
                    title: 'Buy',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity.'
                }
            ] */ 


                        /*     const posts = this.state.posts.map((post, i) => {
                    return (
                        <View key={i} style={styles.container}>
                            <PostCard
                                date={post.createdAt}
                                text={post.text}
                                user={post.user}
                                title={post.title}
                                openModal={this.toggleModal}
                                
                            />
                        </View>
                    )
                }) */