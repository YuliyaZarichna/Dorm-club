import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Color from '../constants/Colors';
import { ListItem } from 'react-native-elements'
import { Platform } from 'react-native';


class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    username: 'brynn',
                },]
        }
    }

    navigateToMessageUser = (item) => {
        this.props.navigation.navigate({
            routeName: 'MessageDetails',
            params: {
                username: item.username
            }
        })
    }
    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.users}
                    keyExtractor={(item) => (String(item.id))}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this.navigateToMessageUser(item)}>
                            <ListItem
                                leftAvatar
                                title={item.username}
                                bottomDivider
                                chevron
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }
}
MessageScreen.navigationOptions = () => {
    return {
        headerTitle: 'Inbox',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.TEAL : ''
        },
        headerTintColor: Platform.OS === 'android' ? Color.WHITE : Color.TEAL,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 30,
    },
})

export default MessageScreen