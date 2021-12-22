import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View} from "react-native";
import SettingsComponent from "../../components/SettingsComponent";

const Settings = () => {
    const [email, setEmail] = useState(null);
    const [sortBy, setSortBy] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const settingsOptions = [
        {title: 'My Info', subtitle: 'Setup your profile', onPress: () => {}},
        {title: 'Accounts', onPress: () => {}},
        {
        title: 'Default account for new contacts',
        subtitle: email,
        onPress: () => {},
        },
        {
        title: 'Contacts to display',
        subtitle: 'All contacts',
        onPress: () => {},
        },
        {
        title: 'Sort by',
        subtitle: sortBy,
        onPress: () => {
            setModalVisible(true);
        },
        },
        {title: 'Name format', subtitle: 'First name first', onPress: () => {}},
        {title: 'Import', onPress: () => {}},
        {title: 'Export', onPress: () => {}},
        {title: 'Blocked numbers', onPress: () => {}},
        {title: 'About AKContacts', onPress: () => {}},
    ];
    const sorting = (key, value) => {
        AsyncStorage.setItem(key,value);
    }

    const preferenceArray = [
        {name: 'First Name',
        selected: sortBy==='First Name',
        onPress:()=>{
            sorting('sortBy', 'First Name');
            setSortBy('First Name');
            setModalVisible(false);
        }},
        {name: 'Last Name',
        selected: sortBy==='Last Name',
        onPress:()=>{
            sorting('sortBy', 'Last Name');
            setSortBy('Last Name');
            setModalVisible(false);
        }},
    ];

    const getSettings = async () => {
        const user = await AsyncStorage.getItem('user');
        setEmail(JSON.parse(user).email);
    
        const sortPreference = await AsyncStorage.getItem('sortBy');
        if (sortPreference) {
          setSortBy(sortPreference);
        }
      };
    useEffect(() => {
        getSettings();
    },[]);

    return (
        <SettingsComponent
            settingsOptions={settingsOptions}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            preferenceArray={preferenceArray}
            
        />
    )
}

export default Settings;