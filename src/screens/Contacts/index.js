import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState, useCallback, useRef} from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "../../components/Common/Icon";
import ContactsComponent from "../../components/ContactsComponent";
import getContacts from "../../context/actions/contacts/getContacts";
import { GlobalContext } from "../../context/Provider";
import { CONTACT_DETAIL} from "../../constants/routeNames";

const Contacts = () => {
    const {navigate, setOptions, toggleDrawer} = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [sortBy, setSortBy] = useState(null);
    const contactsRef = useRef([]);

    const {
        contactsDispatch,
        contactsState: {getContacts: {data, loading},
        },
    } = useContext(GlobalContext);

    useEffect(() => {
        getContacts()(contactsDispatch);
    },[]);

    const getSettings = async () => {
        const sortPreference = await AsyncStorage.getItem('sortBy');
        if (sortPreference) {
          setSortBy(sortPreference);
        }
      };

    useFocusEffect(
        useCallback(
            () => {
                getSettings();
                return ()=> {}
            },[],
        )
    );

    useEffect(() => {
        const prev = contactsRef.current;
    
        contactsRef.current = data;
    
        const newList = contactsRef.current;
        if (newList.length - prev.length === 1) {
          const newContact = newList.find(
            (item) => !prev.map((i) => i.id).includes(item.id),
          );
          navigate(CONTACT_DETAIL, {item: newContact});
        }
    }, [data.length]);

    useEffect(() => {
        setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {toggleDrawer()}}
                >
                    <Icon type='material' name="menu" size={24} style ={{padding: 10}} />
                </TouchableOpacity>
            )
        })
    },[]);
    return (
        <ContactsComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            data={data}
            loading={loading}
            sortBy={sortBy}
        />
    )
}

export default Contacts;