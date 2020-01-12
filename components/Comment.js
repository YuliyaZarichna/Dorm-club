import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Card, Divider } from 'react-native-elements'
import Moment from 'react-moment';


import сolor from '../constants/Colors';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        elevation: 5
    },


});

export default Comment;


// https://docs.nativebase.io/Components.html#card-list-headref


//moment to manage timeago
//https://github.com/headzoo/react-moment