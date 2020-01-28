import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
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
            data: [],
            firstname: '',
            lastname: '',
            username: '',
            email: '',
        }
    }

    getUser = async () => {
        try {
            var token = await SecureStore.getItemAsync('secure_token');
            var id = await SecureStore.getItemAsync('user_id');
            // console.log("user token", token);
            const response = await fetch(`${apiURL}/auth/user/` + id, {
                method: 'GET',
                headers: {
                    //'access-token': token,
                    'Content-Type': 'application/json',
                },
            });
            const res = await response.json();
            console.log("res", res);
            this.setState({
                username: res.username,
                firstname: res.firstname,
                lastname: res.lastname,
            })

            console.log("res[0]", res[0]);

        }
        catch (error) {
            console.error(error);
        }
    }
    componentDidMount() {
        this.getUser()
    }


    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <View style={styles.user}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                        />
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
        // video
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
        //backgroundColor: Color.VIOLET,
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