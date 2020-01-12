import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';


const StartupScreen = props => {

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await SecureStore.getItemAsync('user_data');
            if (!userData) {
                props.navigation.navigate('Settings');
                return;
            }

            const transformedData = JSON.parse(userData);
            const { token, userId, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Settings');
                return;
            }
            props.navigation.navigate('Home');
        };

        tryLogin();
    }, []);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color='blue' />
        </View>
    )

}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default StartupScreen;