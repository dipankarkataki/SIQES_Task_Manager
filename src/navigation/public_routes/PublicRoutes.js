import { View, Text } from 'react-native';
import React from 'react';
import { Splash, Login } from '../../screens';
import constants from '../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const PublicRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={constants.SPLASH} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={constants.SPLASH} component={Splash} />
            <Stack.Screen name={constants.LOGIN} component={Login} />
        </Stack.Navigator>
    )
}

export default PublicRoutes;