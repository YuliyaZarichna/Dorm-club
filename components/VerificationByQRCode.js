import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Button, ColorPropType } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SecureStore from 'expo-secure-store';
import getEnvVars from '../environment';
const { apiURL } = getEnvVars();

import Color from '../constants/Colors';

class VerificationByQRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            scanned: false,
            qrValue: '',
            isLoading: false
        };

    }
    componentDidMount() {
        this.cameraAccess()
    }

    cameraAccess = async () => {
        const result = await BarCodeScanner.requestPermissionsAsync();
        /* this.setState({
            hasPermission: result.status === 'granted'
        }) */
        if (result.status !== 'granted') {
            alert(
                'Insufficient permission',
                'You need to grant location permission to use this app',
                [{ text: 'Okay' }]
            );
            return false;
        }
        else
            console.log('granted')
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({
            scanned: true,
            qrValue: data,
            isLoading: true
        })
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        this.verifyUserByQRCode()
        /* if (this.state.hasPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        } */
    };

    verifyUserByQRCode = async () => {
        console.log('Verification')
        const userId = await SecureStore.getItemAsync('user_id')
        const response = await fetch(`${apiURL}/auth/verifybyqrcode`, {
            method: 'POST',
            headers: {
                //'access-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                qrValue: this.state.qrValue
            }),
        });
        const res = await response.json();
        this.setState({
            isLoading: false
        })
        console.log("res", res);
        if (res.isVerified) {
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
            alert("Seems like QR Code is not correct")
        }
    }

    render() {
        console.log("qrcode");
        if (this.state.isLoading) {
            return (
                <View style={styles.centered} >
                    <ActivityIndicator animating={true} size="large" />
                </View>
            )
        }
        return (
            <View style={styles.location}>
                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {this.state.scanned && (
                    <Button style={styles.button} title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )}
                {/* <Button title="Verify by QR Code" color='green' onPress={this.cameraAccess} /> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    location: {
        height: 300,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        color: Color.TROPICALRAINFOREST
    }
});

export default VerificationByQRCode;

//https://docs.expo.io/versions/latest/sdk/bar-code-scanner/