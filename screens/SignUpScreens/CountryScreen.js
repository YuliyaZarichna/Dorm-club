import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView, Button } from 'react-native';
import Color from '../../constants/Colors';
import str from '../../constants/Strings';
import logo from "../../assets/images/logo2.png";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton'
import getEnvVars from '../../environment';
const { apiURL } = getEnvVars();
import RNPickerSelect from 'react-native-picker-select';



class CountryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            buildings: [],

            selectedCountry: '',
            selectedBulding: '',
        }
    }

    componentDidMount() {
        this.getListOfCountries();
        this.getListOfBuildings()
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

    handleNavigation = () => {
        this.props.navigation.navigate({
            routeName: 'NameDetails',
            params: {
                country: this.state.selectedCountry,
                building: this.state.selectedBulding,
                university: this.props.navigation.getParam('university'),
                subject: this.props.navigation.getParam('subject')
            }
        })
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

    render() {
        let mappedCountry = this.state.countries.map(c => ({
            label: c.name,
            value: c.id
        }));

        let mappedBuilding = this.state.buildings.map(b => ({
            label: b.buildingNr.toString(),
            value: b.id
        }));
        return (
            <ScrollView>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior='position'
                >
                    <View>
                        <Text style={styles.title}>Few more steps to settle down</Text>
                        <Image
                            style={styles.logo}
                            source={logo}
                        />

                        <Text style={styles.text}>Choose your country from the list</Text>

                        <View style={styles.input}>
                            <RNPickerSelect
                                onValueChange={this.handlePickerItemCountry}
                                items={mappedCountry}
                                placeholder={{ label: 'Select country' }}
                                style={pickerSelectStyles}
                                value={this.state.selectedCountry}
                            />
                        </View>
                        <Text style={styles.text}>Choose the buiding where you live</Text>

                        <View style={styles.input}>
                            <RNPickerSelect
                                onValueChange={this.handlePickerItemBuilding}
                                items={mappedBuilding}
                                placeholder={{ label: 'Select building' }}
                                style={pickerSelectStyles}
                                value={this.state.selectedBulding}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={this.handleNavigation}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
CountryScreen.navigationOptions = {
    headerStyle: {
        elevation: 0,
    },
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    logo: {
        width: 250,
        height: 200,
        alignSelf: 'center'
    },

    text: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        color: Color.TROPICALRAINFOREST
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

    buttonContainer: {
        paddingTop: 20
    },

    button: {
        width: "90%",
        alignSelf: "center",
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        backgroundColor: Color.TROPICALRAINFOREST
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


export default CountryScreen;

// for changing picker color
// https://github.com/lawnstarter/react-native-picker-select/blob/master/demo/App.js
