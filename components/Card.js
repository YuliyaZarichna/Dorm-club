import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements'

import сolor from '../constants/Colors';

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // data: props.posts,
            visibleModal: false, // for modal
        };
    }



    render() {
        return (
            <Card style={styles.container}>
                <View style={styles.header}>
                    <Ionicons style={styles.userIcon} name='md-aperture' size={26} />
                    <Text>Tomas</Text>
                    <View style={styles.modalButton}>
                        <TouchableOpacity
                            // in parameter send props about each card to delete 
                            onPress={() => this.props.openModal(this.props.id)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name='md-more' size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text>{this.props.date}</Text>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    <Text style={styles.mainText}>{this.props.text}</Text>
                </View>
                <View>
                    <Divider style={styles.divider} />
                    <TouchableOpacity style={styles.commentContainer} onPress={() => alert("Add comment later")}>
                        <Ionicons style={styles.commentIcon} name='md-albums' style={{ color: '#ED4A6A' }} size={20} />
                        <Text style={styles.commentText}>Comment</Text>
                    </TouchableOpacity>
                </View>
            </Card>

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
    modalButton: {
        marginLeft: 200,
        //justifyContent: 'flex-end',
        // alignContent: 'flex-end',
        alignSelf: 'flex-end'
    },

    contentCard: {
        //flexDirection: 'row',
        //flexDirection: 'column-reverse'
        backgroundColor: 'green',
        height: 40
    },

    card: {
        backgroundColor: 'red'
    },

    userIcon: {
        marginRight: 10
    },
    titleText: {
        fontSize: 20,
        paddingBottom: 0,
        paddingTop: 0
    },
    mainText: {
        paddingBottom: 15
    },
    divider: {
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