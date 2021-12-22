import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import logoutUser from '../../context/actions/auth/logoutUser';
import { GlobalContext } from '../../context/Provider'

const Logout = () => {
    const {authDispatch} = useContext(GlobalContext);
    useEffect(() => {
        logoutUser()(authDispatch);
    },[]);
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
             <ActivityIndicator size="large" />
        </View>
    )
}

export default Logout;
