import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import color from '../constants/Colors';
import str from '../constants/Strings';



class AddPostScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: [
                {
                    date: '',
                    user: '',
                    title: '',
                    text: '',
                }]
        };
    }

    addPost = () => {
        this.setState({

        })
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    placeholder={str.POST_TITLE}
                    placeholderTextColor="lightgrey"
                    value={this.state.title}

                    style={styles.input}
                />

                <TextInput
                    placeholder={str.POST_DETAILS}
                    placeholderTextColor="lightgrey"
                    value={this.state.text}
                    style={styles.input}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        height: 40,
        marginBottom: 20,
        borderColor: "rgba(255,255,255,0.7)",
        color: color.BLACK,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.LIGHTGRAY
    },

})


export default AddPostScreen;

//https://medium.com/@KPS250/creating-an-accordion-in-react-native-f313748b7b46