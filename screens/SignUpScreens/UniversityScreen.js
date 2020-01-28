import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView, Button } from 'react-native';
import Color from '../../constants/Colors';
import Str from '../../constants/Strings';
import logo from "../../assets/images/logo2.png";
import RNPickerSelect from 'react-native-picker-select';
import getEnvVar from '../../environment';
const { apiURL } = getEnvVar();


class UniversityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universities: [],
            selectedUniversity: '',
            setSpecialization: ''
        }
    }
    componentDidMount() {
        this.getListOfUniversities();
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
    /** Handle navigation to the next screen. 
        * Set chosen info (country, building) in nav parameter to be able to bring it to the next screen.
        * Transition university and specialization to the next screen*/
    handleNavigation = () => {
        this.props.navigation.navigate({
            routeName: 'Country',
            params: {
                university: this.state.selectedUniversity,
                specialization: this.state.setSpecialization
            }
        })
    }

    handlePickerItem = (uni) => {
        if (uni !== 0) {
            this.setState({ selectedUniversity: uni });
        }
    }

    render() {
        const mappedUniversity = this.state.universities.map(u => ({
            label: u.name,
            value: u.id,
        }));


        return (
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior='position'
                    keyboardVerticalOffset={100}
                >
                    <View>
                        <Image style={styles.logo} source={logo} />
                        <Text style={styles.text}>{Str.CHOOSEUNI}</Text>

                        <View style={styles.input}>
                            <RNPickerSelect
                                onValueChange={this.handlePickerItem}
                                items={mappedUniversity}
                                placeholder={{ label: 'Select university' }}
                                style={pickerSelectStyles}
                                value={this.state.selectedUniversity}
                            />
                        </View>

                        <Text style={styles.text}>{Str.CHOOSESPEC}</Text>

                        <View style={styles.textInput}>
                            <TextInput
                                style={{ paddingBottom: 0 }}
                                onChangeText={(specialisation) => this.setState({ setSpecialization: specialisation })}
                                value={this.state.setSpecialization}
                                underlineColorAndroid='transparent'
                                placeholder="enter university specialisation "
                                spellCheck={true}
                                autoCorrect={false}
                            >
                            </TextInput>
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

UniversityScreen.navigationOptions = {
    headerStyle: {
        elevation: 0,
    },
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 0,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    logo: {
        width: 250,
        height: 250,
        alignSelf: 'center'
    },

    text: {
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        color: Color.TEAL,
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
        borderBottomColor: Color.LIGHTGRAY,
    },

    textInput: {
        height: 30,
        marginBottom: 20,
        marginTop: 10,
        width: "90%",
        alignSelf: 'center',
        borderColor: "rgba(255,255,255,0.7)",
        color: Color.BLACK,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color.LIGHTGRAY,
        textDecorationLine: 'none'
    },

    buttonContainer: {
        bottom: 0, //Here is the trick
    },

    button: {
        width: "90%",
        alignSelf: "center",
        marginTop: 50,
        paddingVertical: 12,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        backgroundColor: Color.TROPICALRAINFOREST,
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

export default UniversityScreen;

// not to select the first value in item picker
// https://stackoverflow.com/questions/42169272/how-to-provide-picker-a-default-please-select-option
