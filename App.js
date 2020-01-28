import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { StyleSheet, View } from 'react-native';
import { enableScreens } from 'react-native-screens'
import MainTabNavigator from './navigation/MainTabNavigator';

enableScreens(); // responsible for better performance

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,

    }
  }

  fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  }

  render() {
    if (!this.state.loading) {
      return (
        <AppLoading
          startAsync={this.fetchFonts}
          onFinish={() => this.setState({ loading: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={styles.container}>
        <MainTabNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;