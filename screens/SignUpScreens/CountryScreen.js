import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView, Button } from 'react-native';
import Color from '../../constants/Colors';
import str from '../../constants/Strings';
import logo from "../../assets/images/logo.png";
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
        const country = this.state.countries.map((c, i) => {
            return <Picker.Item key={i} value={c.id} label={c.name} />
        });
        const building = this.state.buildings.map((bld, i) => {
            return <Picker.Item key={i} value={bld.id} label={bld.buildingNr.toString()} />
        })
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
                            <Picker
                                selectedValue={this.state.selectedCountry}
                                onValueChange={this.handlePickerItemCountry}
                            >
                                <Picker.Item key={'unselectable'} label={'Country'} value={0} color="lightgrey" enable={false} />
                                {country}
                            </Picker>
                        </View>
                        <Text style={styles.text}>Choose the buiding where you live</Text>

                        <View style={styles.input}>
                            <Picker
                                selectedValue={this.state.selectedBulding}
                                onValueChange={this.handlePickerItemBuilding}
                            >
                                <Picker.Item key={'unselectable'} label={'Building'} value={0} color="lightgrey" enable={false} />
                                {building}
                            </Picker>
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
/* CountryScreen.navigationOptions = {
    headerStyle: {
        elevation: 0,    
    },
}  */
CountryScreen.navigationOptions = navData => {
    return {
        headerStyle: {
            elevation: 0,
        },
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Skip'
                    onPress={() => {
                        navData.navigation.navigate('NameDetails');
                    }}
                />
            </HeaderButtons>
        )
    };
};

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
        color: 'green'
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
        backgroundColor: Color.VIOLET
    },

    buttonText: {
        textAlign: 'center',
        fontWeight: '700',
        color: Color.WHITE
    },
})

export default CountryScreen;


/*          countries: [{
              name: "Afghanistan"
          }, {
              name: "Albania",
          }, {
              name: "Algeria"
          }, {
              name: "Andorra"
          }, {
              name: "Angola"
          }, {
              name: "Argentina"
          }, {
              name: "Armenia"
          }, {
              name: "Ukraine"
          }], */