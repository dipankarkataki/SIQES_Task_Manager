import {StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from './auth_routes/AuthRoutes';
import PublicRoutes from './public_routes/PublicRoutes';
import { useSelector } from "react-redux";

const Routes = () => {
    const userAuthToken = useSelector((state) => state.userAuth);
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#2CABE2" barStyle="default" />
            {!!userAuthToken ? <AuthRoutes /> : <PublicRoutes />}
        </NavigationContainer>
    )
}

export default Routes;