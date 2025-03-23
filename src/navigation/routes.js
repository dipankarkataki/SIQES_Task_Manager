import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from './auth_routes/AuthRoutes';
import PublicRoutes from './public_routes/PublicRoutes';

const Routes = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#2CABE2" barStyle="default" />
            {!!userAuthToken ? <AuthRoutes /> : <PublicRoutes />}
        </NavigationContainer>
    )
}

export default Routes;