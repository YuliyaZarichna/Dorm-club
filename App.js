import React from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useScreens } from 'react-native-screens'

import AppNavigator from './navigation/AppNavigator';
import MainNav from './navigation/MainTabNavigator'
import LoginScreen from './screens/LogIn/LogInScreen';
import SettingsScreen from './screens/SettingsScreen';
import ModalWindow from './components/Modal'

import RegisterScreen from './screens/Registration/RegisterScreen';
import MainTabNavigator from './navigation/MainTabNavigator';

useScreens(); // responsible for better performance

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }
  /* 
    async _loadResourcesAsync() {
      await Promise.all([
  
        Font.loadAsync({
          ...Ionicons.font,
        }),
      ]);
    } */

  fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  }
  /*   async componentDidMount() {
           this.setState({ loading: true });
          const data = await this.props.fetchUniversities();
          this.setState({ loading: false, universities: data})  
    } */

  render() {

    if (!this.state.loading) {
      return (
        <AppLoading
          startAsync={this.fetchFonts}
          onFinish={() => this.setState({ loading: true })}
          onError={console.warn}
        />
        /*<View style={styles.container} >
        <ActivityIndicator size='large'></ActivityIndicator>
        </View> */
      );
    }
    return (

      <View style={styles.container}>
        {/* <ModalWindow /> */}
        {/*{this.state.universities.map((university, i) => (
           <Text key={i}>{university.name}</Text>
          ))} */}
        {/* <StatusBar barStyle="default" /> */}
        {/* <RegisterScreen/> */}
        {/* <LoginScreen /> */}
        {/* <AppNavigator />  */}
        {/*  <SettingsScreen /> */}
        <MainTabNavigator />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: 30
  },

});

export default App;