import React from 'react';
import { View, Text, Image, Switch, TouchableOpacity } from 'react-native';
import Container from '../Common/Container';
import Input from '../Common/Input';
import CustomButton from '../Common/CustomButton';
import styles from './styles';
import CountryPicker from 'react-native-country-picker-modal';
import {DEFAULT_IMAGE_URI} from '../../constants/general';
import colors from '../../assets/theme/colors';
import ImagePicker from '../Common/ImagePicker';

const CreateContactComponent = ({onChange,
    form,
    onSubmit,
    setForm,
    loading,
    error,
    toggleSwitch,
    sheetRef,
    openSheet,
    closeSheet,
    onFileSelected,
    localFile,
}) => {
    return (
        <View style={styles.container}>
            <Container>
                <Image
                    width={150}
                    height={150}
                    source={{uri: localFile?.path || localFile || DEFAULT_IMAGE_URI}}
                    style={styles.imageView}
                />
                <TouchableOpacity onPress={openSheet}>
                    <Text style={styles.chooseText}>Choose Image</Text>
                </TouchableOpacity>
                <Input
                    label='First Name'
                    placeholder='Enter First Name'
                    onChangeText={(value) => {
                        onChange({name:'firstName',value});
                    }}
                    error={error?.first_name?.[0]}
                    value={form.firstName || ''}
                />
                <Input
                    label='Last Name'
                    placeholder='Enter Last Name'
                    onChangeText={(value) => {
                        onChange({name:'lastName',value});
                    }}
                    error={error?.last_name?.[0]}
                    value={form.lastName || ''}
                />
                <Input
                    icon={
                        <CountryPicker
                            withFilter
                            withFlag
                            countryCode={form.countryCode || undefined}
                            withCountryNameButton={false}
                            withCallingCode
                            withCallingCodeButton
                            withEmoji
                            onSelect={(val)=>{
                                const phoneCode = val.callingCode[0];
                                const cCode = val.cca2;
                                setForm({...form, phoneCode, countryCode: cCode});
                            }}    
                        />
                    }
                    style={{paddingLeft:10}}
                    iconPosition='left'
                    label='Phone Number'
                    placeholder='Enter Phone Number'
                    onChangeText={(value) => {
                        onChange({name:'phoneNumber',value});
                    }}
                    error={error?.phone_number?.[0]}
                    value={form.phoneNumber || ''}
                />
                
                <View style={styles.switchText}>
                    <Text style={{fontSize:17}}>Add to favorites</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: colors.primary }}
                        thumbColor={form.isFavorite ? colors.success : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={form.isFavorite}
                    />
                </View>
                <CustomButton primary title='Save Contact' onPress={onSubmit} loading={loading} disabled={loading}/>
            </Container>

            <ImagePicker ref={sheetRef} onFileSelected={onFileSelected} />
        </View>
    )
}

export default CreateContactComponent;
