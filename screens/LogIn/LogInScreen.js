import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import logo from "../../assets/images/logo2.png";
import Str from '../../constants/Strings';
import Color from '../../constants/Colors';
import * as SecureStore from 'expo-secure-store';

import { useScreens } from 'react-native-screens';
import getEnvVars from '../../environment';
const { apiURL } = getEnvVars();

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAuthenticated: false,
      isVerified: false,
      id: '',

    }
  }

  login = async () => {

    if (this.state.email.trim().length === 0 || this.state.password.trim().length === 0) {
      console.log("if validation");
      alert("please fill both your username and password")
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
      const res = await response.json();
      console.log("login res", res);

      /*   else if (!res.ok) {
          alert("User not found")
        } */
      if (res.isAuthenticated) {
        console.log("else validation");
        console.log("expiresIn", res);
        //console.log("res.token.expiresIn", res.token.expiresIn);

        await SecureStore.setItemAsync('secure_token', res.accessToken);
        await SecureStore.setItemAsync('user_id', JSON.stringify(res.id));
        //console.log('Success:', JSON.stringify(res));
        /*    const expirationDate = new Date(new Date().getTime() + 186400  + 1000); 
           this.saveDataToStorage(res.accessToken, res.id, expirationDate); */
        if (res.isVerified) {
          console.log("verified");
          this.props.navigation.navigate('Home')
        }
        else {
          console.log("not verified");
          this.props.navigation.navigate('Verification')
        }
      }
      else {
        alert('wrong username or password, try again')
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  // stire data in storage and use it for auto login auto logout, from video
  saveDataToStorage = (token, userId, expirationDate) => {
    SecureStore.setItemAsync(
      'user_data',
      JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
      })
    )
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
            <Image
              style={styles.logo}
              source={logo}
            />
            <Text style={styles.welcomeText}>Welcome to Aristotelessteig Dorm Club</Text>
          </View>
          <View>
            <TextInput
              placeholder={Str.EMAIL}
              placeholderTextColor="lightgrey"
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => this.passwordInput.focus()} // when enter the email
              style={styles.input}
              value={this.state.email}
              onChangeText={(value) => this.setState({ email: value })}
            />

            <TextInput
              placeholder={Str.PASSWORD}
              placeholderTextColor="lightgrey"
              returnKeyType="go"
              secureTextEntry
              ref={(input) => this.passwordInput = input}
              style={styles.input}
              value={this.state.password}
              onChangeText={(value) => this.setState({ password: value })}
            />
            <TouchableOpacity style={styles.buttonContainer}
              /* onPress={() => this.props.navigation.navigate('Home')} */
              onPress={this.login}
            >
              <Text style={styles.buttonText}>{Str.LOGIN}</Text>
            </TouchableOpacity>
          </View>
          <View>
            {/*  <Text
              onPress={() => { }}
              style={styles.signupText}>
              {Str.FORGOT}
            </Text> */}
            <View style={styles.signupText}>
              <Text style={{ color: Color.LIGHTGRAY }}>
                Dont have an account?
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => this.props.navigation.navigate('University')}
                  style={styles.signup}>
                  SIGN UP
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
    //flexGrow: 1,
    //justifyContent: 'center'
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