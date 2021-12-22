import React, { useContext, useCallback, useState } from "react";
import RegisterComponent from "../../components/Signup";
import envs from "../../config/env";
import registerUser, { clearAuthState } from "../../context/actions/auth/registerUser";
import axiosInstance from "../../helpers/axiosInstance";
import {GlobalContext} from "../../context/Provider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LOGIN } from "../../constants/routeNames";

const Register = () => {
  const {navigate} = useNavigation();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    
    const {authDispatch,
      authState:{error, loading , data},
    } = useContext(GlobalContext);

    // console.log('error >> ', error);
    // console.log('data >> ',data);

    useFocusEffect(
      useCallback(() => {
        return () => {
          if(data || error) {
            clearAuthState()(authDispatch);
          }
        }
      },[data, error])
    );

    const onChange = ({name, value}) => {
        setForm({...form, [name]: value})

        if (value !== '') {
            if (name === 'password') {
              if (value.length < 8) {
                setErrors((prev) => {
                  return {...prev, [name]: 'Password must be min 8 characters'};
                });
              } else {
                setErrors((prev) => {
                  return {...prev, [name]: null};
                });
              }
            } else {
              setErrors((prev) => {
                return {...prev, [name]: null};
              });
            }
          } else {
            setErrors((prev) => {
              return {...prev, [name]: 'This field is required'};
            });
          }
    }
    const onSubmit = () => {
        if(!form.userName) {
            setErrors((prev)=>{
                return {...prev,userName:'Username is required'}
            })
        }
        if(!form.firstName) {
            setErrors((prev)=>{
                return {...prev,firstName:'firstName is required'}
            })
        }
        if(!form.lastName) {
            setErrors((prev)=>{
                return {...prev,lastName:'lastname is required'}
            })
        }
        if(!form.email) {
            setErrors((prev)=>{
                return {...prev,email:'email is required'}
            })
        }
        if(!form.password) {
            setErrors((prev)=>{
                return {...prev,password:'password is required'}
            })
        }

        if(Object.values(form).length === 5 && 
          Object.values(form).every(item =>item.trim().length>0) &&
          Object.values(errors).every((item) => !item)
        ) {
            registerUser(form)(authDispatch)((response) => {
              navigate(LOGIN, {data: response})
            });
        }
    }
    return (
        <RegisterComponent
          onSubmit={onSubmit}
          onChange={onChange}
          form={form}
          errors={errors}
          error={error}
          loading={loading} 
        />
    )
}
export default Register;