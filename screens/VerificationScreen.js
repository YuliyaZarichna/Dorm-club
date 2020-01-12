import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import VerificationByLocation from '../components/VerificationByLocation'
import VerificationByQRCode from '../components/VerificationByQRCode'
import Color from '../constants/Colors';


class VerificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }
    navigateToVerificationByQR = () => {
        this.props.navigation.navigate({
            routeName: 'VerificationQR',
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


    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.centered} >
                    <ActivityIndicator animating={true} size="large" />
                    <Text>Loading</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.body2}>Almost done, the last step</Text>
                <Text style={styles.header}>Please verify your address</Text>
                <Text style={styles.body}>We would like to be sure, that you are an Aristotelessteig resident</Text>
                <Text style={styles.body2}>Your data will not be stored, shared or used</Text>
                <View style={styles.bottomContainer}>
                    <VerificationByLocation navigation={this.props.navigation} />
                    {/*  <Button style={styles.button} title="Verify by QR Code" color='green' onPress={() => this.props.navigation.navigate('VerificationQR')} /> */}
                    <TouchableOpacity style={styles.button} onPress={() => this.navigateToVerificationByQR()}>
                        <Text style={styles.buttonText}>Verify by QR Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => { alert('Feature is coming') }}>
                        <Text style={styles.buttonText}>Verify by Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        //  marginTop: 20,
        marginBottom: 20,
    },
    header: {
        fontSize: 28,
        color: Color.TEAL,
        textAlign: 'center',
    },
    body: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
    },
    body2: {
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
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
    bottomContainer: {
        justifyContent: 'flex-end',
        marginTop: 200
    }

})


export default VerificationScreen