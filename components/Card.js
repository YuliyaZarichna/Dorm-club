import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Card, Divider, Avatar } from 'react-native-elements'
import Moment from 'react-moment';
import Color from '../constants/Colors';

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false, // for modal
        };
    }

    navigateToPostDetail() {
        this.props.navigation.navigate({
            routeName: 'PostDetails',
            params: {
                postId: this.props.id,
                postTitle: this.props.title,
                postText: this.props.text,
                createdAt: this.props.date,
                postUserName: this.props.user
            }
        })
    }

    render() {
        /**
         * to manage time, timeago
         * https://github.com/headzoo/react-moment
         */
        const timeAgo = this.props.date
        return (
            <TouchableOpacity onPress={() => this.navigateToPostDetail()}>
                <Card>
                    <View style={styles.header}>
                        <Avatar size='medium' rounded />
                        <Text style={styles.titleText}>{this.props.title}</Text>
                        <View style={styles.modalButton}>
                            <TouchableOpacity
                                onPress={() => this.props.openModal(this.props.id)}  // in parameter send props about each card to delete 
                                hitSlop={{ top: 50, bottom: 50, left: 20, right: 50 }}>
                                <Ionicons name='md-more' size={22} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.username} >by {this.props.user}</Text>
                        <Moment style={styles.moment} element={Text} fromNow>{timeAgo}</Moment>
                    </View>
                    <Divider style={styles.divider} />

                    <View>
                        <Text style={styles.mainText}>{this.props.text}</Text>
                    </View>
                    <Divider style={styles.divider} />

                    {/* Handle Comment to a Post  */}
                    <TouchableOpacity style={styles.commentContainer} onPress={() => this.navigateToPostDetail()}>
                        <Ionicons style={styles.commentIcon} name='md-albums' style={{ color: Color.PASTELRED }} size={20} />
                        <Text style={styles.commentText}>Comment</Text>
                    </TouchableOpacity>
                </Card>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        elevation: 5
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
    modalButton: {
        position: 'absolute',
        right: 5
    },

    userIcon: {
        marginRight: 10
    },
    titleText: {
        fontSize: 24,
        paddingLeft: 20,
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
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
