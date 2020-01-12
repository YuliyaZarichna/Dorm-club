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
import PostDetailsScreen from '../screens/PostDetailsScreen';


import LoginScreen from '../screens/LogIn/LogInScreen';
import UniversityScreen from '../screens/SignUpScreens/UniversityScreen';
import CountryScreen from '../screens/SignUpScreens/CountryScreen';
import NameDetailsScreen from '../screens/SignUpScreens/NameDetailsScreen';
import VerificationScreen from '../screens/VerificationScreen'
import EmailPasswordScreen from '../screens/SignUpScreens/EmailPasswordScreen';
import StartupScreen from '../screens/StartupScreen'
import VerificationByQRCode from '../components/VerificationByQRCode'
import NeighborDetailsScreen from '../screens/NeighborDetailsScreen'
import MessageDetailsScreen from '../screens/MessageDetailsScreen'



import RegisterScreen from '../screens/Registration/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Button } from 'react-native';
import Color from '../constants/Colors';
import NeightborScreen from '../screens/NeighborScreen';



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
        })
    },
    PostDetails: {
        screen: PostDetailsScreen
    }
})

const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
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
const NeighborStack = createStackNavigator({
    Neighbor: {
        screen: NeightborScreen,
    },
    NeighborDetails: {
        screen: NeighborDetailsScreen,
        navigationOptions: {
            headerTitle: "I am your neighbor"
        }
    },
    MessageDetails: {
        screen: MessageDetailsScreen,
    },
});

const MessageStack = createStackNavigator({
    Message: {
        screen: MessageScreen,
        navigationOptions: {
            headerTitle: "Inbox"
        }
    },
    MessageDetails: {
        screen: MessageDetailsScreen,
    },
});

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
    /*    Register: {
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
       }, */
    University: {
        screen: UniversityScreen,
    },
    Country: {
        screen: CountryScreen,
    },
    NameDetails: {
        screen: NameDetailsScreen
    },
    EmailPassword: {
        screen: EmailPasswordScreen
    },
    Verification: {
        screen: VerificationScreen,
        navigationOptions: {
            headerTitle: 'Verification',
        }
    },
    VerificationQR: {
        screen: VerificationByQRCode,
        navigationOptions: {
            headerTitle: 'QR Verification',
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
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarOptions: {
                activeTintColor: Color.TEAL,
            },
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name='md-home'
                />
            ),
        }
    },
    Neighbor: {
        screen: NeighborStack,
        navigationOptions: {
            tabBarLabel: 'Neighbors',
            tabBarOptions: {
                activeTintColor: Color.TEAL,
            },
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name='md-people'
                />
            ),
        }
    },
    Message: {
        screen: MessageStack,
        navigationOptions: {
            tabBarLabel: 'Inbox',
            tabBarOptions: {
                activeTintColor: Color.TEAL,
            },
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name='md-mail'
                />
            ),
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: '',
            tabBarOptions: {
                activeTintColor: Color.TEAL,
            },
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name='md-person'
                />
            ),
        }
    },
}, {
    /*    tabBarOptions: {
           headerTintColor: Color.TEAL,
           headerStyle: {
               backgroundColor: '#000',
           },
       } */
}
);

const RootSwitch = createSwitchNavigator({
    //Startup: { screen: StartupScreen },
    Auth: { screen: AuthStack },
    AppProfile: ProfileStack,
    AppNeighbor: NeighborStack,
    AppMessage: MessageStack,
    RootSwitch: { screen: TabNavigator },

})


export default createAppContainer(RootSwitch);

// took the idea of how to orginize the Navigation 
// https://www.reactnativeschool.com/complex-navigation-example-with-react-navigation
