import React,{useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Container from "../../components/Common/Container";
import Input from "../../components/Common/Input";
import CustomButton from "../../components/Common/CustomButton";
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import {REGISTER} from "../../constants/routeNames";
import Message from '../Common/Message';

const LoginComponent = ({
    onSubmit,
    error,
    onChange,
    loading,
    form,
    justSignedUp,
}) => {
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
                <Text style={styles.title}>Welcome to AKContacts</Text>
                <Text style={styles.subTitle}>Please login here</Text>
                <View style={styles.form}>
                    {justSignedUp && (
                        <Message
                            onDismiss={() => {}}
                            success
                            message="Account created successfully!!"
                        />
                    )}
                    {error && !error.error && (
                        <Message
                            onDismiss={() => {}}
                            danger
                            message="Invalid Credentials!"
                        />
                    )}

                    {error?.error && <Message danger onDismiss message={error?.error} />}
                    <Input 
                        label="Username"
                        placeholder="Enter Username"
                        iconPosition="right"
                        value={form.userName || null}
                        onChangeText={(value) => {
                            onChange({name: 'userName', value});
                        }}
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
                        onChangeText={(value) => {
                            onChange({name: 'password', value});
                        }}
                    />
                    <CustomButton
                        onPress={onSubmit}
                        disabled={loading}
                        loading={loading}
                        title="Submit" 
                        primary
                    />
                    <View style={styles.createSection} >
                        <Text style={styles.infoText}>Need an account?</Text>
                        <TouchableOpacity onPress={()=>{navigate(REGISTER)}}>
                            <Text style={styles.linkBtn}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
            
            </View>
            
        </Container>
    )
}

export default LoginComponent;
