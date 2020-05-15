import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements'
import getEnvVar from '../environment';
const { apiURL } = getEnvVar();
import Color from '../constants/Colors';
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
        // send props to navOptions in header
        this.props.navigation.setParams({ clearPickerItems: this.clearPickerItems })
    }

    /** fetch countries */
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

    /** fetch buildings */
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

    /** fetch universities */
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

    /** save selected item */
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

    /** search for user by university, country, or building */
    searchUsers = async () => {
        const country = this.state.selectedCountry
        const university = this.state.selectedUniversity
        const building = this.state.selectedBulding
        const userId = await SecureStore.getItemAsync('user_id')

        try {
            this.setState({
                isLoading: true,
            });
            /** send in parameter id of selected item */
            const response = await fetch(`${apiURL}/auth/searchusers?userId=${userId}&countryId=${country}&universityId=${university}&dormId=${building}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            this.setState({
                isLoading: false,
            });

            const resJson = await response.json();
            if (response.ok) {
                this.setState({
                    users: resJson
                });
                if (resJson.length === 0) {
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

    /** navigate to neighbor details page 
     * send data to the page 
    */
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

    /** clear selected value from text field */
    clearPickerItems = () => {
        this.setState({
            selectedCountry: '',
            selectedUniversity: '',
            selectedBulding: ''
        });
    }

    render() {
        /** map through the lists */
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
                    <FlatList
                        data={this.state.users}
                        keyExtractor={(item) => (String(item.id))}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
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
        /**https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15674826#overview 
       * extra package to handle a button in a header
      */
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='clear'
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