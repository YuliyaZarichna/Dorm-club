import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SecureStore from 'expo-secure-store';
import getEnvVar from '../environment';
const { apiURL } = getEnvVar();
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

    /** https://docs.expo.io/versions/latest/sdk/bar-code-scanner/ 
    * ask user permission to access device camera
    */
    cameraAccess = async () => {
        const result = await BarCodeScanner.requestPermissionsAsync();
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
            /*  isLoading: true */
        })
        this.verifyUserByQRCode()
        if (this.state.hasPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>;
        }
    };

    /** send scanned QR code to back-end and do verification */
    verifyUserByQRCode = async () => {
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
        const resJson = await response.json();
        if (resJson.isVerified) {
            this.setState({
                isLoading: false
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
            alert("Seems like QR Code is not correct")
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
            <View style={styles.location}>
                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {this.state.scanned && (
                    <Button style={styles.button} title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )}
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
