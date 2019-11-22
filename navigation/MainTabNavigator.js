import React from 'react';
import { Platform } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NeighborScreen from '../screens/NeighborScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FAQScreen from '../screens/FAQScreen';

import LoginScreen from '../screens/LogIn/LogInScreen';
import RegisterScreen from '../screens/Registration/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity} from 'react-native';



// Home Page
const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
);

HomeScreen.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='md-home'
        />
    ),
}
HomeStack.path = '';

// Neighbor Page
const NeighborStack = createStackNavigator(
    {
        Neighbor: NeighborScreen,
    },
);

NeighborScreen.navigationOptions = {
    tabBarLabel: 'Neighbors',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='md-people'
        />
    ),
}
NeighborStack.path = '';

// Settings Page
/* const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    }
);

SettingsScreen.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='md-settings'
        />
    ),
    headerTitle: 'Settings',
};

SettingsStack.path = ''; */


// Message Page
const MessageStack = createStackNavigator(
    {
        Message: MessageScreen,
    }
);
MessageScreen.navigationOptions = {
    tabBarLabel: 'Inbox',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='md-mail'
        />
    ),
};
MessageStack.path = '';

// Profile Page 
/* const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Profile',
            headerRight: () =>
                <Ionicons name='md-settings'
                    style={{ marginRight: 20 }}
                    size={26}
                    onPress={() =>
                        // console.log("click")
                        navigation.navigate('Settings')
                    }
                />
        })
    }
}); */

//FAQ
FAQScreen.navigationOptions = {
    tabBarLabel: 'FAQ',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='md-information-circle-outline'
        />
    ),
};



const AppStack = createStackNavigator({

    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'My Profile',
            headerRight: () =>
                <TouchableOpacity>
                    <Ionicons name='md-settings'
                        style={{ marginRight: 20 }}
                        size={26}
                        onPress={() =>
                            // console.log("click")
                            navigation.navigate('Settings')
                        }
                    />
                </TouchableOpacity>
        })
    },

    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            headerTitle: "Settings"
        }
    },
});

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            header: null
        }
    },
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    initialRouteName: 'Home'
})

const TabNavigator = createBottomTabNavigator({

    Home: { screen: HomeScreen },
    Neighbor: { screen: NeighborScreen },
    Message: { screen: MessageScreen },
    Profile: {
        screen: AppStack,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name='md-person'
                />
            ),
        }
    },
    FAQ: { screen: FAQScreen }

}, {
    tabBarOptions: {
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#000',
        },
    }
}
);

const RootSwitch = createSwitchNavigator({
    Auth: {
        screen: AuthStack
    },
    App: AppStack,
    RootSwitch: { screen: TabNavigator },

})


export default createAppContainer(RootSwitch);

// took the idea of how to orginize the Navigation 
// https://www.reactnativeschool.com/complex-navigation-example-with-react-navigation
