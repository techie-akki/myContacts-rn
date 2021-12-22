import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {ActivityIndicator, Alert, Text, TouchableOpacity, View} from "react-native";
import colors from "../../assets/theme/colors";
import Icon from "../../components/Common/Icon";
import ContactDetailComponent from "../../components/ContactDetailsComponent";
import { CONTACT_LIST } from "../../constants/routeNames";
import deleteContact from "../../context/actions/contacts/deleteContact";
import uploadImage from "../../helpers/uploadImage";
import editContact from "../../context/actions/contacts/editContact";
import { GlobalContext } from "../../context/Provider";

const ContactDetail = () => {
    const {params: {item = {}} = {}} = useRoute();
    const {setOptions, navigate} = useNavigation();
    const sheetRef = useRef(null);
    const [localFile, setLocalFile] = useState(null);
    const [updatingImage, setUpdatingImage] = useState(false);
    const [uploadSucceeded, setUploadSucceeded] = useState(false);
    const {
        contactsDispatch,
        contactsState: {
          deleteContact: {loading},
        },
      } = useContext(GlobalContext);

    useEffect(() => {
        if (item) {
          setOptions({
            title: item.first_name + ' ' + item.last_name,
            headerRight: () => {
              return (
                <View style={{flexDirection: 'row', paddingRight: 10}}>
                  <TouchableOpacity>
                    <Icon
                      size={21}
                      color={colors.grey}
                      name={item.is_favorite ? 'star' : 'star-border'}
                      type="material"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Delete!',
                        'Are you sure you want to remove ' + item.first_name,
                        [
                          {
                            text: 'Cancel',
                            onPress: () => {},
                          },
    
                          {
                            text: 'OK',
                            onPress: () => {
                              deleteContact(item.id)(contactsDispatch)(() => {
                                navigate(CONTACT_LIST);
                              });
                            },
                          },
                        ],
                      );
                    }}
                    style={{paddingLeft: 10}}>
                    {loading ? (
                      <ActivityIndicator size="small" color={colors.primary} />
                    ) : (
                      <Icon
                        color={colors.grey}
                        size={21}
                        name="delete"
                        type="material"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            },
          });
        }
      }, [item, loading]);

      const closeSheet = () => {
        if (sheetRef.current) {
          sheetRef.current.close();
        }
      };
      const openSheet = () => {
        if (sheetRef.current) {
          sheetRef.current.open();
        }
      };
    
      const onFileSelected = (image) => {
        closeSheet();
        setLocalFile(image);
        setUpdatingImage(true);
        uploadImage(image)((url) => {
          const {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            country_code: phoneCode,
            is_favorite: isFavorite,
          } = item;
          editContact(
            {
              firstName,
              lastName,
              phoneNumber,
              isFavorite,
              phoneCode,
              contactPicture: url,
            },
            item.id,
          )(contactsDispatch)((item) => {
            setUpdatingImage(false);
            setUploadSucceeded(true);
          });
        })((err) => {
          console.log('err :>> ', err);
          setUpdatingImage(false);
        });
    };
    return (
        <View>
            <ContactDetailComponent
                contact={item}
                sheetRef={sheetRef}
                localFile={localFile}
                updatingImage={updatingImage}
                uploadSucceeded={uploadSucceeded}
                openSheet={openSheet}
                onFileSelected={onFileSelected}
            />
        </View>
    )
}

export default ContactDetail;