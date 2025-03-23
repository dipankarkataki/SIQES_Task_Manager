import { View, Text } from 'react-native';
import React from 'react';
import { Splash, Dashboard } from '../../screens';
import constants from '../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
    return (
        <Stack.Navigator initialRouteName={constants.SPLASH} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={constants.SPLASH} component={Splash} />
            <Stack.Screen name={constants.DASHBOARD} component={Dashboard} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;