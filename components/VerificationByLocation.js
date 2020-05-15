import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as SecureStore from 'expo-secure-store';
import getEnvVar from '../environment';
const { apiURL } = getEnvVar();
import Color from '../constants/Colors';
import Str from '../constants/Strings';


class VerificationByLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: {},
            isLoading: false
        };
    }

    /** https://docs.expo.io/versions/v36.0.0/sdk/permissions/
    * ask user permission to access device location
    */
    verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            alert(
                'Insufficient permission',
                'You need to grant location permission to use this app',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    }

    /** https://docs.expo.io/versions/v36.0.0/sdk/location/
    * read users geolocation 
    */
    getUserLocation = async () => {
        const hasPermission = await this.verifyPermission();
        if (!hasPermission) {
            return
        }
        try {
            this.setState({
                isLoading: true
            })
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            this.setState({
                userLocation: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                }
            })
            this.verifyUserByLocation()

        } catch (error) {
            alert('Could not fetch a locaion!', 'Please try again '),
                [{ text: 'Okay' }]
        }
        this.setState({
            isLoading: false
        })
    }

    /** send users geolocation to back-end and do verification */
    verifyUserByLocation = async () => {
        const userId = await SecureStore.getItemAsync('user_id')
        const response = await fetch(`${apiURL}/auth/verifybylocation`, {
            method: 'POST',
            headers: {
                //'access-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                lat: this.state.userLocation.lat,
                lng: this.state.userLocation.lng,
            }),
        });
        const resJson = await response.json();
        if (resJson.isVerified) {
            this.setState({
                isLoading: true
            })
            /**send users data to welcome page to display it */
            this.props.navigation.navigate({
                routeName: 'Welcome',
                params: {
                    university: this.props.navigation.getParam('university'),
                    subject: this.props.navigation.getParam('subject'),
                    country: this.props.navigation.getParam('country'),
                    building: this.props.navigation.getParam('building'),
                    firstname: this.props.navigation.getParam('firstname'),
                    lastname: this.props.navigation.getParam('lastname'),
                    username: this.props.navigation.getParam('username'),
                }
            })
        }
        else {
            alert("Seems like you are not in Aristo!")
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.centered} >
                    <ActivityIndicator animating={true} size="large" />
                </View>
            )
        }
        return (
            <View>
                <TouchableOpacity style={styles.button} onPress={this.getUserLocation}>
                    <Text style={styles.buttonText}>{Str.VERIFYLOCATION}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    button: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        backgroundColor: Color.TEAL,
    },

    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: Color.WHITE
    },
});

export default VerificationByLocation;
