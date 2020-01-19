import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements'
import getEnvVars from '../environment';
const { apiURL } = getEnvVars();
import Color from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import * as SecureStore from 'expo-secure-store';
import RNPickerSelect from 'react-native-picker-select';



class NeightborScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            countries: [],
            buildings: [],
            universities: [],
            selectedCountry: '',
            selectedBulding: '',
            selectedUniversity: '',
        }
    }
    componentDidMount() {
        this.getListOfCountries();
        this.getListOfBuildings();
        this.getListOfUniversities();
        // send props to navOptions
        this.props.navigation.setParams({ clearPickerItems: this.clearPickerItems })
    }

    getListOfCountries = async () => {
        try {
            const res = await fetch(`${apiURL}/countries`);
            const countries = await res.json();
            this.setState({
                countries
            })
        }
        catch (err) {
            this.setState({ loading: false, err: true })
        }
    }
    getListOfBuildings = async () => {
        try {
            const res = await fetch(`${apiURL}/buildings`);
            const buildings = await res.json();
            this.setState({
                buildings
            })
        }
        catch (err) {
            this.setState({ loading: false, err: true })
        }
    }

    getListOfUniversities = async () => {
        try {
            const res = await fetch(`${apiURL}/universities`);
            const universities = await res.json();
            this.setState({
                universities
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    handlePickerItemCountry = (country) => {
        if (country !== 0) {
            this.setState({ selectedCountry: country });
        }
    }

    handlePickerItemBuilding = (build) => {
        if (build !== 0) {
            this.setState({ selectedBulding: build });
        }
    }

    handlePickerItemUniversity = (uni) => {
        if (uni !== 0) {
            this.setState({ selectedUniversity: uni });
        }
    }



    searchUsers = async () => {
        const country = this.state.selectedCountry
        const university = this.state.selectedUniversity
        const building = this.state.selectedBulding

        const userId = await SecureStore.getItemAsync('user_id')
        console.log("userId", userId);

        try {
            this.setState({
                isLoading: true,
            });

            const response = await fetch(`${apiURL}/auth/searchusers?userId=${userId}&countryId=${country}&universityId=${university}&dormId=${building}`, {
                method: 'GET',
                headers: {
                    //'access-token': token,
                    'Content-Type': 'application/json',
                },
            });
            this.setState({
                isLoading: false,
            });

            const responseJson = await response.json();

            if (response.ok) {
                this.setState({
                    users: responseJson
                });
                if (responseJson.length === 0) {
                    alert("User not found")
                }
            }
            else {
                alert("Search failed. Try again!")
                this.setState({
                    users: []
                });
            }
        }
        catch (error) {
            this.setState({
                isError: true
            });
        }
    }
    navigateToUser = (item) => {
        this.props.navigation.navigate({
            routeName: 'NeighborDetails',
            params: {
                username: item.username,
                country: item.Country.name,
                university: item.University.name,
                building: item.Dorm.buildingNr
            }
        })
    }
    clearPickerItems = () => {
        this.setState({
            selectedCountry: '',
            selectedUniversity: '',
            selectedBulding: ''
        });
    }


    render() {
        const mappedCountry = this.state.countries.map(c => ({
            label: c.name,
            value: c.id
        }));
        const mappedBuilding = this.state.buildings.map(b => ({
            label: b.buildingNr.toString(),
            value: b.id
        }));
        const mappedUniversity = this.state.universities.map(u => ({
            label: u.name,
            value: u.id
        }));


        return (
            <View style={styles.container}>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={this.handlePickerItemCountry}
                        items={mappedCountry}
                        placeholder={{ label: 'Select country' }}
                        style={pickerSelectStyles}
                        value={this.state.selectedCountry}
                    />
                </View>

                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={this.handlePickerItemBuilding}
                        items={mappedBuilding}
                        placeholder={{ label: 'Select building' }}
                        style={pickerSelectStyles}
                        value={this.state.selectedBulding}
                    />
                </View>

                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={this.handlePickerItemUniversity}
                        items={mappedUniversity}
                        placeholder={{ label: 'Select university' }}
                        style={pickerSelectStyles}
                        value={this.state.selectedUniversity}
                    />

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.searchUsers}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                {this.state.isLoading ?
                    <View style={styles.centered} >
                        <ActivityIndicator animating={true} size="large" />
                    </View>
                    :
                    /*   <Text>No User found</Text> */
                    <FlatList
                        data={this.state.users}
                        keyExtractor={(item) => (String(item.id))}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.navigateToUser(item)}>
                                <ListItem
                                    leftAvatar
                                    title={item.username}
                                    bottomDivider
                                    chevron
                                />
                            </TouchableOpacity>
                        )}
                    />
                }
            </View>
        );
    }
}

NeightborScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Find your neighbor',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL,
        // video
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='clear'
                    //iconName={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    onPress={() => { navData.navigation.state.params.clearPickerItems() }}
                />
            </HeaderButtons>
        )
    };
};


const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },

    input: {
        height: 40,
        marginBottom: 20,
        width: "90%",
        alignSelf: 'center',
        borderColor: "rgba(255,255,255,0.7)",
        color: Color.BLACK,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color.LIGHTGRAY
    },

    button: {
        width: "90%",
        alignSelf: "center",
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
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: 'black',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'black',
    },
});

export default NeightborScreen