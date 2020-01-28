import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import logo from "../../assets/images/logo2.png";
import Str from '../../constants/Strings';
import Color from '../../constants/Colors';
import * as SecureStore from 'expo-secure-store';
import getEnvVar from '../../environment';
const { apiURL } = getEnvVar();


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAuthenticated: false,
      isVerified: false,
    }
  }

  login = async () => {
    /* form validation to check if email and password text input is empty */
    if (this.state.email.trim().length === 0 || this.state.password.trim().length === 0) {
      alert("Please fill both your username and password!")
      return false
    }

    try {
      const response = await fetch(`${apiURL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
      const resJson = await response.json();

      /* if email and password are correct get a token */
      if (resJson.isAuthenticated) {

        await SecureStore.setItemAsync('secure_token', resJson.accessToken);
        await SecureStore.setItemAsync('user_id', JSON.stringify(resJson.id));

        if (resJson.isVerified) {
          this.props.navigation.navigate('Home')
        }
        /* if user is registered but is not verified, redirect to verification */
        else {
          this.props.navigation.navigate('Verification')
        }
      }
      /* if email or password does not match to users input */
      else {
        alert('Wrong username or password, try again!')
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior='position'
        style={styles.container}
        keyboardVerticalOffset={10}
      >
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.welcomeText}>{Str.WELCOME}</Text>
          </View>
          <View>
            <TextInput
              placeholder={Str.EMAIL}
              placeholderTextColor="lightgrey"
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              value={this.state.email}
              onChangeText={(value) => this.setState({ email: value })}
            />

            <TextInput
              placeholder={Str.PASSWORD}
              placeholderTextColor="lightgrey"
              returnKeyType="go"
              secureTextEntry
              style={styles.input}
              value={this.state.password}
              onChangeText={(value) => this.setState({ password: value })}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
              <Text style={styles.buttonText}>{Str.LOGIN}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.signupText}>
              <Text style={{ color: Color.LIGHTGRAY }}>{Str.NOACCOUNT}</Text>
              <TouchableOpacity>
                <Text
                  onPress={() => this.props.navigation.navigate('University')}
                  style={styles.signup}>{Str.SIGNUP}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  logoContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 50
  },

  logo: {
    width: 250,
    height: 250,
  },

  welcomeText: {
    color: Color.TROPICALRAINFOREST,
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },

  input: {
    height: 40,
    marginBottom: 20,
    borderColor: "rgba(255,255,255,0.7)",
    color: Color.BLACK,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.LIGHTGRAY
  },

  text: {
    color: Color.WHITE,
    textAlign: "center",
    height: 20
  },

  buttonContainer: {
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

  signupText: {
    flexDirection: 'row',
    paddingTop: 10,
    alignSelf: "flex-end",
    color: Color.LIGHTGRAY,
    paddingRight: 20
  },

  signup: {
    color: Color.TROPICALRAINFOREST,
    paddingLeft: 8
  }
})

export default LoginScreen;