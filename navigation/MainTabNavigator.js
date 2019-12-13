import React from 'react';
import { Platform } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NeighborScreen from '../screens/NeighborScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FAQScreen from '../screens/FAQScreen';
import AddPostScreen from '../screens/AddPostScreen';

import LoginScreen from '../screens/LogIn/LogInScreen';
import RegisterScreen from '../screens/Registration/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Button } from 'react-native';
import Color from '../constants/Colors';



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

// Post Page
const PostStack = createStackNavigator(
    {
        AddPost: AddPostScreen,
    }
);
AddPostScreen.navigationOptions = {
    tabBarLabel: 'Inbox',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='md-mail'
        />
    ),
};
PostStack.path = '';


const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },

    AddPost: {
        screen: AddPostScreen,
        navigationOptions: ({ }) => ({
            headerTitle: 'Create Post',
            headerRight: () => {
                <Button
                    title="+1"
                />
            }
        })
    },
})

const AppStack = createStackNavigator({

    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'My Profile',
            headerRight: () =>
                <TouchableOpacity>
                    <Ionicons name='md-settings'
                        style={{ marginRight: 20, color: Color.tabIconDefault }}
                        size={26}
                        onPress={() => navigation.navigate('Settings')}
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

    FAQs: {
        screen: FAQScreen,
        navigationOptions: {
            headerTitle: "FAQ"
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
        navigationOptions: ({ navigation }) => ({
           // headerTitle: 'Registration',
            headerRight: () =>
                <TouchableOpacity>
                    <Ionicons name='md-done-all'
                        style={{ marginRight: 20, color: Color.tabIconDefault }}
                        size={26}
                        onPress={() =>
                            navigation.navigate('Welcome')
                        }
                    />
                </TouchableOpacity>
        })
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

    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name='md-home'
                />
            ),
        }
    },
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
    //  FAQ: { screen: FAQScreen }

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
    // Nav: SomeNav,
    App: AppStack,
    RootSwitch: { screen: TabNavigator },

})


export default createAppContainer(RootSwitch);

// took the idea of how to orginize the Navigation 
// https://www.reactnativeschool.com/complex-navigation-example-with-react-navigation
