import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import logo from "../../assets/images/logo.png";
import str from '../../constants/Strings';
import Colors from '../../constants/Colors';


import LoginForm from './LogInForm';

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  registration = () => {
    console.log("click");
  }
  render() {
    //const { navigation } = this.props; 

    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior='position'
          style={styles.container}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={logo}
            />
            <Text style={styles.welcomeText}>Welcome to Aristo Dorm Club</Text>
          </View>
          <View>
            <LoginForm navigation={this.props.navigation}/>
           </View> 
          <View>
            <Text
              onPress={() => console.log("forgot password")}
              style={styles.signupText}>
              {str.FORGOT}
            </Text>

            <Text
              style={styles.signupText}>
              Dont have an account?
                <Text
                  onPress={() => this.props.navigation.navigate('Register')}
                  style={styles.signup}>
                  SIGN UP
                </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        //justifyContent: 'center'
        marginTop: 100
    },

    logo: {
        width: 250,
        height: 250,
    },

    welcomeText: {
        color: "green",
        fontSize: 16, 
    },

    text: {
        color: Colors.WHITE,
        textAlign: "center",
        height: 20
    },

    signupText: {
        paddingTop: 10,
        alignSelf: "flex-end",
        color: Colors.LIGHTGRAY,
        paddingRight: 20
    },

    signup: {
        color: Colors.VIOLET
    }

})
  export default LoginScreen;