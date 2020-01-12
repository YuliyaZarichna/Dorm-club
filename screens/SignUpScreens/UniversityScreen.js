import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Picker, ScrollView, Button } from 'react-native';
import Color from '../../constants/Colors';
import str from '../../constants/Strings';
import logo from "../../assets/images/logo2.png";
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton'
import RNPickerSelect from 'react-native-picker-select';

import getEnvVars from '../../environment';
const { apiURL } = getEnvVars();


class UniversityScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universities: [],
            selectedUniversity: '',
            setSpecialisation: ''
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
            // console.log("universities", universities);
        }
        catch (error) {
            console.error(error);
        }
    }

    handleNavigation = () => {
        this.props.navigation.navigate({
            routeName: 'Country',
            params: {
                university: this.state.selectedUniversity,
                subject: this.state.setSubject
            }
        })
    }

    handlePickerItem = (uni) => {
        if (uni !== 0) {
            this.setState({ selectedUniversity: uni });
        }
    }

    dateList = () => {
        let dataList = this.state.universities.map(x => ({
            label: x.name,
            value: x.id
        }));
        return dataList;
    }

    render() {
        //console.log("selectedUniversity", this.state.selectedUniversity);
        // const university = this.state.universities.map((uni, i) => {
        //     return <Picker.Item key={i} value={uni.id} label={uni.name} />
        // })
        // console.log("university", university);

        let mappedUniversity = this.state.universities.map(x => ({
            label: x.name,
            value: x.id
        }));
        return (
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior='position'
                    keyboardVerticalOffset={100}
                >
                    <View>
                        <Image
                            style={styles.logo}
                            source={logo}
                        />
                        {/* <Text style={styles.title}>Welcome to Aristoteles Student Dormitory</Text> */}


                        <Text style={styles.text}>Choose your university from the list</Text>

                        <View style={styles.input}>
                            <RNPickerSelect
                                onValueChange={this.handlePickerItem}
                                //onDonePress={this.handlePickerItem}

                                items={mappedUniversity}
                            />

                        </View>
                        {/* <View style={styles.input}>
                            <Picker
                                // style={{ height: 100, width: '100%' }}
                                iosHeader="Select one"
                                selectedValue={this.state.selectedUniversity}
                                onValueChange={this.handlePickerItem}
                            >
                                <Picker.Item key={'unselectable'} label={'University'} value={0} color="lightgrey" enable={false} />
                                {university}
                            </Picker>
                        </View> */}

                        <Text style={styles.text}>Enter the specialisation you study</Text>

                        <View style={styles.textInput}>
                            <TextInput
                                style={{ paddingBottom: 0 }}
                                onChangeText={(specialisation) => this.setState({ setSpecialisation: specialisation })}
                                value={this.state.setSpecialisation}
                                underlineColorAndroid='transparent'
                                placeholder="university specialisation "
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

UniversityScreen.navigationOptions = navData => {
    return {
        headerStyle: {
            elevation: 0,
        },
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Skip'
                    onPress={() => {
                        navData.navigation.navigate('Country');
                    }}
                />
            </HeaderButtons>
        )
    };
};

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

export default UniversityScreen;

// not to select the first value in item picker
// https://stackoverflow.com/questions/42169272/how-to-provide-picker-a-default-please-select-option


/*        universities: [{
           name: "akkon Hochschule"
       }, {
           name: "Alice Salomon Hochschule Berlin",
       }, {
           name: "Bard College Berlin"
       }, {
           name: "bbw Hochschule"
       }, {
           name: "Beuth Hochschule für Technik Berlin"
       }, {
           name: "BSP Business School Berlin"
       }, {
           name: "Charité - Universitätsmedizin Berlin"
       }, {
           name: "DEKRA Hochschule Berlin"
       }], */