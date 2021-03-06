import React, {useContext, useEffect, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import { GlobalContext } from "../context/Provider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from "react-native";
import { navigationRef } from "./SideMenu/RootNavigator";
import SplashScreen from 'react-native-splash-screen';

const AppNavContainer = () => {
    const {authState:{isLoggedIn}}  = useContext(GlobalContext);
    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
    const [authLoaded,setAuthLoaded] = useState(false);

    const getUser = async () => {
        try {
           const user = await AsyncStorage.getItem('user');

            if(user) {
                setAuthLoaded(true);
                setIsAuthenticated(true);
            } else {
                setAuthLoaded(true);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log('User not found!', error);
        }
    }

    useEffect(() => {
        getUser();
    }, [isLoggedIn]);

    useEffect(()=>{
        if(authLoaded){
            SplashScreen.hide();
        }
        
    },[authLoaded]);

    return (
        <>
          {authLoaded ? (
              <NavigationContainer ref={navigationRef}>
              {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator /> }
          </NavigationContainer>
          ) : (
              <ActivityIndicator />
          )}  
        </>
        
    )
}

export default AppNavContainer;