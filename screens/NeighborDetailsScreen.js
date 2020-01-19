import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Color from '../constants/Colors';
import str from '../constants/Strings';


class NeighborDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    contactUser = () => {
        this.props.navigation.navigate({
            routeName: 'MessageDetails',
            params: {

            }
        })
    }

    render() {
        const username = this.props.navigation.getParam('username')
        const country = this.props.navigation.getParam('country')
        const university = this.props.navigation.getParam('university')
        const building = this.props.navigation.getParam('building')
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Hey there!</Text>
                <Card title={username}>

                    <View style={styles.user}>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.country}>I am from {country} </Text>
                        <Text style={styles.country}>I study in {university} </Text>
                        <Text style={styles.country}>I live in building {building}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => this.contactUser()}>
                        <Text style={styles.buttonText}>Contact</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }
}

NeighborDetailsScreen.navigationOptions = () => {
    return {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        textAlign: 'center'
    },
    country: {
        marginBottom: 10
    },
    button: {
        width: "90%",
        alignSelf: "center",
        paddingVertical: 10,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        backgroundColor: Color.TEAL,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: Color.WHITE
    },
})

export default NeighborDetailsScreen;