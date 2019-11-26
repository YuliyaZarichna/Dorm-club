import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ScrollView, Button, Text, TouchableOpacity } from 'react-native';
import PostCard from '../components/Card';
import Modal from 'react-native-modal';


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            posts: [
                {
                    date: '11.22.2019',
                    user: 'Ivan',
                    title: 'Sell',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity. If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity'
                },
                {
                    date: '11.22.2019',
                    user: 'Fin',
                    title: 'Sell',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity.'
                },
                {
                    date: '11.22.2019',
                    user: 'Coco',
                    title: 'Offer',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity.'
                }, {
                    date: '11.22.2019',
                    user: 'Badger',
                    title: 'Buy',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity.'
                }, {
                    date: '11.22.2019',
                    user: 'Volya',
                    title: 'Buy',
                    text: 'If you try styling something that will be easy in React-Native. Because css style props are easy to understand. Also if you familiar to web designing and ReactJs styling you can easily design your app layouts. You need rounded border use borderRadius or if you need more dark shadow, so you can increment the shadowOpacity.'
                }
            ]
        }
    }
    _renderModalContent = () => (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={this.deleteCard}>
                <Text>Hide Post</Text>
            </TouchableOpacity>
            {/*  <Button title="DELETE" onPress={this.deleteCard} />*/}
            {/*  <Button title="Hide modal" onPress={this.toggleModal} /> */}
        </View>
    );
    toggleModal = (cardInformation) => {
        console.log("cardInformation", cardInformation)
        this.deleteCard(cardInformation)
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    //delete by id 
    deleteCard = (cardInformation) => {

        this.state.posts.pop()
        const indexInArray = this.state.posts.findIndex(eachPost => {
            eachPost.user === cardInformation.user
        })
        this.state.posts.splice(indexInArray, 1);
    }
    render() {
        const posts = this.state.posts.map((post, i) => {
            return (
                <ScrollView key={i} style={styles.container}>
                    <PostCard date={post.date} text={post.text} user={post.user} title={post.title} openModal={this.toggleModal} />
                </ScrollView>
            )
        })

        return (
            <>
                <Modal isVisible={this.state.isModalVisible === true}
                    backdropOpacity={.50}
                    backdropTransitionOutTiming={700}
                    onBackdropPress={this.toggleModal}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver={true}>
                    {this._renderModalContent()}
                </Modal>

                <ScrollView>
                    {posts}
                </ScrollView>
                <View>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.props.navigation.navigate('AddPost') }}>
                        <Text style={styles.buttonTextStyle}>+</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    card: {
        backgroundColor: "green"

    },
    cardItem: {
    },
    main: {
    },

    buttonStyle: {
        backgroundColor: '#fc454e',
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
    }
})

export default HomeScreen;


// add round button
// https://stackoverflow.com/questions/49509604/fixed-button-over-a-scrollview 