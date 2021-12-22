import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import CreateContactComponent from "../../components/CreateContactComponent";
import createContact from "../../context/actions/contacts/createContact";
import { GlobalContext } from "../../context/Provider";
import {CONTACT_DETAIL, CONTACT_LIST} from "../../constants/routeNames";
import uploadImage from "../../helpers/uploadImage";
import countryCodes from "../../utils/countryCodes";
import editContact from "../../context/actions/contacts/editContact";

const CreateContact = () => {
    const {params} = useRoute();
    const {navigate, setOptions} = useNavigation();
    const [form, setForm] = useState({});
    const [localFile, setLocalFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const {
        contactsDispatch,
        contactsState: {
            createContact: {loading, error, data},
        },
    } = useContext(GlobalContext);
    const sheetRef = useRef(null);

    const onChange = ({name, value}) => {
        setForm({...form, [name]: value});
    }

    useEffect(() => {
        if (params?.contact) {
          setOptions({title: 'Update contact'});
          const {
            first_name: firstName,
            phone_number: phoneNumber,
            last_name: lastName,
            is_favorite: isFavorite,
            country_code: countryCode,
        } = params?.contact;
    
        setForm((prev) => {
            return {
              ...prev,
              firstName,
              isFavorite,
              phoneNumber,
              lastName,
              phoneCode: countryCode,
            };
        });
    
        const country = countryCodes.find((item) => {
            return item.value.replace('+', '') === countryCode;
        });

        if (country) {
            setForm((prev) => {
                return {
                ...prev,
                countryCode: country.key.toUpperCase(),
                };
            });
        }

        if (params?.contact?.contact_picture) {
            setLocalFile(params?.contact.contact_picture);
          }
        }
    }, []);

    const onSubmit = () => {
        if (params?.contact) {
            if(localFile?.size){
                setUploading(true);
                uploadImage(localFile)((url)=>{
                    setUploading(false);
                    editContact({...form, contactPicture:url},params?.contact.id)(contactsDispatch)((item)=>{
                        navigate(CONTACT_DETAIL,{item});
                    });
                })((error)=>{
                    console.log('error:>> ',error);
                    setUploading(false);
                });
            }
            editContact(form, params?.contact.id)(contactsDispatch)((item)=>{
                navigate(CONTACT_DETAIL,{item});
            });
        } else {
            if(localFile?.size){
                setUploading(true);
                uploadImage(localFile)((url)=>{
                    setUploading(false);
                    createContact({...form, contactPicture:url})(contactsDispatch)(()=>{
                        navigate(CONTACT_LIST);
                    });
                })((error)=>{
                    console.log('error>> ',error);
                    setUploading(false);
                });
            }
            createContact(form)(contactsDispatch)(()=>{
                navigate(CONTACT_LIST);
            });
        }
        
    }

    const toggleSwitch = () => {
        setForm({...form, isFavorite: !form.isFavorite});
    }

    const openSheet = () => {
        if(sheetRef.current) {
            sheetRef.current.open();
        }
    }
    const closeSheet = () => {
        if(sheetRef.current) {
            sheetRef.current.close();
        }
    }
    const onFileSelected = (image) => {
        closeSheet();
        setLocalFile(image);
        console.log('image:>> ', image);
    }

    

    return (
        <CreateContactComponent
            onChange={onChange}
            form={form}
            onSubmit={onSubmit}
            setForm={setForm}
            loading={loading || uploading}
            error={error}
            toggleSwitch={toggleSwitch}
            sheetRef={sheetRef}
            openSheet={openSheet}
            closeSheet={closeSheet}
            onFileSelected={onFileSelected}
            localFile={localFile}
        />
    )
}

export default CreateContact;