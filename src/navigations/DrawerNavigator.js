import React, { useContext } from "react";
import { createDrawerNavigator} from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator";
import { HOME_NAVIGATOR } from "../constants/routeNames";
import SideMenu from "./SideMenu";
import { GlobalContext } from "../context/Provider";

const DrawerNavigator = () => {
    const {authDispatch} = useContext(GlobalContext);
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            screenOptions={{headerShown:false, drawerType:'slide'}}
            drawerContent={({navigation}) => (
                 <SideMenu navigation={navigation} authDispatch={authDispatch} />
            )}
        >
            <Drawer.Screen name = {HOME_NAVIGATOR} component = {HomeNavigator}></Drawer.Screen>
            
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;