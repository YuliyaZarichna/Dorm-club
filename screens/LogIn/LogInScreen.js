import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import logo from "../../assets/images/logo.png";
import str from '../../constants/Strings';
import Colors from '../../constants/Colors';
import LoginForm from './LogInForm';
import getEnvVars from '../../environment';
const { apiURL } = getEnvVars();

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isTocken: true
    }
    console.log("email", this.state.email);
  }

  login = async () => {
    try {
      this._isMounted = true;
      const response = await fetch(`${apiURL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          isTocken: true
        }),
      })
      //console.log("response", response.json);
    }
    catch (error) {
      console.error(error);
    }
  }

  registration = () => {
    console.log("click");
  }
  render() {

    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior='position'
          style={styles.container}
          keyboardVerticalOffset={100}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={logo}
            />
            <Text style={styles.welcomeText}>Welcome to Aristo Dorm Club</Text>
          </View>
          <View>
            <LoginForm
           //setParentState={newState=>this.setState(newState)}
             //email={this.state.email} 
             password={this.state.password} navigation={this.props.navigation}/>
          </View>
          <View>
            <Text
              onPress={() => this.login()}
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