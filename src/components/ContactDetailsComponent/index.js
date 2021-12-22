import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import ImageComponent from './ImageComponent';
import Icon from '../Common/Icon';
import CustomButton from '../Common/CustomButton';
import {CREATE_CONTACT} from '../../constants/routeNames';
import styles from './styles';
import colors from '../../assets/theme/colors';
import { DEFAULT_IMAGE_URI } from '../../constants/general';
import ImagePicker from '../Common/ImagePicker';

const ContactDetailComponent = ({
    contact,
    openSheet,
    sheetRef,
    onFileSelected,
    updatingImage,
    localFile,
    uploadSucceeded,
}) => {
    const {navigate} = useNavigation();
    const {
        contact_picture,
        first_name,
        country_code,
        phone_number,
        last_name,
    } = contact;

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {(contact_picture || uploadSucceeded) && <ImageComponent src={contact_picture || localFile?.path} />}
                {!contact_picture && !uploadSucceeded && (
                    <View style={{alignItems:'center',paddingVertical:20,}}>
                        <Image
                        width={150}
                        height={150}
                        source={{uri: localFile?.path || DEFAULT_IMAGE_URI}}
                        style={styles.imageView}
                    />
                    <TouchableOpacity onPress={()=>{openSheet();}}>
                        <Text style={{color:colors.primary}}>{updatingImage? 'updating...':'Add Image'}</Text>
                    </TouchableOpacity>
                    </View>
                )}
                <View style={styles.content}>
                    <Text style={styles.names}>{first_name} {last_name}</Text>
                </View>
                <View style={styles.hrLine} />

                <View style={styles.topCallOptions}>
                    <TouchableOpacity style={styles.topCallOption}>
                        <Icon
                        type="ionicon"
                        name="call-outline"
                        color={colors.primary}
                        size={27}
                        />
                        <Text style={styles.middleText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topCallOption}>
                        <Icon
                        type="materialCommunity"
                        name="message-text"
                        color={colors.primary}
                        size={27}
                        />
                        <Text style={styles.middleText}>Text</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topCallOption}>
                        <Icon
                        type="materialCommunity"
                        name="video"
                        color={colors.primary}
                        size={27}
                        />
                        <Text style={styles.middleText}>Video</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.middleCallOptions}>
                    <Icon
                        type="ionicon"
                        name="call-outline"
                        color={colors.grey}
                        size={27}
                    />
                    <View style={styles.phoneMobile}>
                        <Text style={{fontSize:18}}>{phone_number}</Text>
                        <Text style={{fontSize:14,opacity:0.7}}>Mobile</Text>
                    </View>

                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        }}>
                        <Icon
                        type="materialCommunity"
                        name="video"
                        color={colors.primary}
                        size={27}
                        />
                        <Icon
                        type="materialCommunity"
                        name="message-text"
                        color={colors.primary}
                        size={27}
                        style={[styles.msgIcon]}
                        />
                    </View>
                </View>
                <CustomButton
                    style={styles.btn}
                    primary
                    title="Edit Contact"
                    onPress={() => {
                        navigate(CREATE_CONTACT, {contact, editing: true});
                    }}
                />
            </View>
            <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
        </ScrollView>
    )
}

export default ContactDetailComponent;
