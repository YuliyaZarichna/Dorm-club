import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';



class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        /* 
                navigationOptions = ({ navigation }) => {
                    return {
                        headerRight: () =>
                        <Ionicons name='md-settings'
                            style={{ marginRight: 20}}
                            size={26}
                            onPress={() =>
                                navigation.navigate('Settings')}
                        />
                    };
                };*/
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <View tyle={styles.welcomeContainer}>
                    </View>
                    <Text>Settings screen view</Text>
                    <Ionicons name='md-log-out'><Text>Logout</Text></Ionicons>
                    <Container>
                        <Header />
                        <Content>
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                        <Icon active name="airplane" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Airplane Mode</Text>
                                </Body>
                                <Right>
                                    <Switch value={false} />
                                </Right>
                            </ListItem>
                                                   </Content>
                    </Container>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'blue',
    },
})

export default SettingsScreen;