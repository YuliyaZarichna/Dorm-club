import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as SecureStore from 'expo-secure-store';
import getEnvVar from '../environment';
const { apiURL } = getEnvVar();
import Color from '../constants/Colors';
import Str from '../constants/Strings';


class VerificationByLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userLocation: {},
            isLoading: false
        };
    }

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
        const res = await response.json();
        console.log("res verifyByLocation", res);
        if (res.isVerified) {
            this.setState({
                isLoading: true
            })
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
            alert("Seems like you are not in Aristo")
        }
    }

    render() {
        console.log("userlocation", this.state.userLocation);
        /*      if (this.state.isLoading) {
                 return (
                     <View style={styles.centered} >
                         <ActivityIndicator animating={true} size="large" />
                         <Text>Loading</Text>
                     </View>
                 )
             } */
        return (
            <View>

                <View style={styles.location}>
                    {/* {this.state.isLoading ? (
                        <ActivityIndicator size='large' color='green' />
                    ) : (<Text>No location chosen yet</Text>
                        )} */}
                </View>
                <TouchableOpacity style={styles.button} onPress={this.getUserLocation}>
                    <Text style={styles.buttonText}>Verify by location</Text>
                </TouchableOpacity>
                {/* <Button title="Verify by location" color='green' onPress={this.getUserLocation} /> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    location: {
        //flex: 1,
        //marginBottom: 10
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

