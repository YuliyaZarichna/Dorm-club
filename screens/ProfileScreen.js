import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Color from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import { Card } from 'react-native-elements'
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import getEnvVar from '../environment';
const { apiURL } = getEnvVar();


class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
        }
    }

    /** get user data on page */
    componentDidMount() {
        this.getUser()
    }

    /**Fetch users data */
    getUser = async () => {
        try {
            var token = await SecureStore.getItemAsync('secure_token');
            var id = await SecureStore.getItemAsync('user_id');
            const response = await fetch(`${apiURL}/auth/user/` + id, {
                method: 'GET',
                headers: {
                    //'access-token': token,
                    'Content-Type': 'application/json',
                },
            });
            const resJson = await response.json();
            this.setState({
                username: resJson.username,
                firstname: resJson.firstname,
                lastname: resJson.lastname,
            })
        }
        catch (error) {
            console.error(error);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <View style={styles.user}>
                        <Image style={styles.image} resizeMode="cover" />
                        <Text style={styles.country}>Username: {this.state.username} </Text>
                        <Text style={styles.country}>Firstname: {this.state.firstname} </Text>
                        <Text style={styles.country}>Lastname: {this.state.lastname} </Text>
                    </View>
                </Card>
            </View>
        );
    }
}

ProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Profile',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL,
        /**https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15674826#overview 
         * extra package to handle a button in a header
        */
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Settings'
                    iconName='md-settings'
                    onPress={() => {
                        navData.navigation.navigate('Settings');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 30,
    },
    textContainer: {
        flexDirection: 'row',
        paddingLeft: 20
    },
    text: {
        color: 'black',
        fontSize: 20,

    }
})

export default ProfileScreen;