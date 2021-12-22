import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Container from "../../components/Common/Container";
import Input from "../../components/Common/Input";
import CustomButton from "../../components/Common/CustomButton";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import {LOGIN} from "../../constants/routeNames";
import Message from '../Common/Message';

const RegisterComponent = ({onSubmit, onChange, form, errors, loading, error}) => {
    const {navigate} = useNavigation();
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    return (
        <Container>
            <Image
                height={70}
                width={70}
                source={require('../../assets/images/logo.png')}
                style={styles.logoImage}
            />
            <View>
                <Text style={styles.title}>Welcome to AkContacts</Text>
                <Text style={styles.subTitle}>Create an account</Text>
                <View style={styles.form}>
                    {error?.error && (
                        <Message
                            retry
                            danger
                            retrFn={onSubmit}
                            message={error?.error}
                        />
                    )}
                    <Input 
                        label="Username"
                        placeholder="Enter username"
                        iconPosition="right"
                        onChangeText={(value)=>{
                            onChange({name: 'userName', value});
                        }}
                        error={errors.userName || error?.username?.[0]}
                    />
                    <Input 
                        label="First Name"
                        placeholder="Enter first name"
                        iconPosition="right"
                        onChangeText={(value)=>{
                            onChange({name: 'firstName', value});
                        }}
                        error={errors.firstName || error?.first_name?.[0]}
                    />
                    <Input 
                        label="Last Name"
                        placeholder="Enter last name"
                        iconPosition="right"
                        onChangeText={(value)=>{
                            onChange({name: 'lastName', value});
                        }}
                        error={errors.lastName || error?.last_name?.[0]}
                    />
                    <Input 
                        label="Email"
                        placeholder="Enter email"
                        iconPosition="right"
                        onChangeText={(value)=>{
                            onChange({name: 'email', value});
                        }}
                        error={errors.email || error?.email?.[0]}
                    />
                    <Input 
                        label="Password"
                        secureTextEntry={isSecureEntry}
                        placeholder="Enter password"
                        icon={
                            <TouchableOpacity onPress={()=>{
                                setIsSecureEntry(prev=>!prev)
                            }}>
                                <Text>{isSecureEntry ? "SHOW" : "HIDE"}</Text>
                            </TouchableOpacity>
                        }
                        iconPosition="right"
                        onChangeText={(value)=>{
                            onChange({name: 'password', value});
                        }}
                        error={errors.password || error?.password?.[0]}
                    />
                    <CustomButton
                        onPress={onSubmit}
                        loading={loading}
                        disabled={loading}
                        title="Submit"
                        primary
                    />
                    <View style={styles.createSection} >
                        <Text style={styles.infoText}>Already have an account?</Text>
                        <TouchableOpacity onPress={()=>{navigate(LOGIN)}}>
                            <Text style={styles.linkBtn}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
            </View>
            
        </Container>
    )
}

export default RegisterComponent;
