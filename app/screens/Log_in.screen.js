import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import React, { useState } from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';

import { Formik } from 'formik'
import * as Yup from 'yup'
import auth from '@react-native-firebase/auth'
import { AnimatedErrorComponent } from '../components/reanimated.component';
import { topPos } from '../screens/Authentication.screen';
const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const {width: SCREEN_WIDTH} = Dimensions.get('window')

const Login = ({navigation}) => {
    // error message state variable
    const [err, setErr] = useState('')
    const [pos_show, setPos_show] = useState(topPos) // variable to translate error component

// LoginSchema
const LoginSchema = Yup.object().shape({ 
    email: Yup.string().email().required('An email is required'), 
    password: Yup.string().required().min(8, 'Password must have at least 8 characters'), 
  })
  
  // handle login authentication
  const onLogin = (email, password, navigation) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            setErr('Success!')
            setPos_show(100)
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            setErr('User not found!')
            setPos_show(100)
            setTimeout(() => {
              setPos_show(0)
            }, 3080)
         }else if (error.code === 'auth/invalid-email') {
            setErr('Invalid email!')
            setPos_show(100)
         }else if(error.code === 'auth/wrong-password') {
            setErr('Invalid password!')
            setPos_show(100)
         }else{
           setErr(error.code.slice(5,30))
            setPos_show(100)
            setTimeout(() => {
              setPos_show(0)
            }, 3080)
         }
        }
      );      
    }

  return (
    <Animated.View style={Login_styles.wrapper}>
      <Formik 
      initialValues={{email: '', password: ''}}
      onSubmit={values => onLogin(values.email, values.password, navigation)}
      validateOnMount={true}
      validationSchema={LoginSchema}
      
      >{({handleChange, handleSubmit, values}) => 
      <>
        <View style={Login_styles.header}>
            <AnimatedErrorComponent error_message={err} s_value={pos_show}/>            
            <TouchableOpacity style={Login_styles.back_btn} onPress={() => navigation.goBack()}>
                  <AntIcon name={'arrowleft'} size={26} color='#000'/>
            </TouchableOpacity>
            <Text style={Login_styles.h_txt}>Login</Text>
        </View>
        <View style={Login_styles.form_wrapper}>
            {/** form */}
            <TextInput style={Login_styles.txt_i} 
            placeholder={'Email'}
            placeholderTextColor={'#0D3665'} 
            autoFocus={false} 
            autoCapitalize='none'
            textContentType='emailAddress'
            keyboardType='email-address'
            onChangeText={handleChange('email')}
            value={values.email}/>

            <TextInput style={Login_styles.txt_i} 
            placeholder={'Password'}
            placeholderTextColor={'#0D3665'} 
            autoCorrect={false}
            textContentType='password'
            onChangeText={handleChange('password')}
            keyboardType={'visible-password'}
            value={values.password}
            />

            {/** submit button */}
            <TouchableOpacity onPress={() =>
               handleSubmit()}>
                <View style={Login_styles.btn}>
                    <Text style={Login_styles.btn_txt} >Login</Text>
                    <AntIcon name={'arrowright'} size={24} color='#006397'/>
                </View>
            </TouchableOpacity>
        </View>
        </>}
      </Formik>
    </Animated.View>
  )
}

// Login styles

const Login_styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#FFF',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    h_txt: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
    },
    back_btn: {
        width: 40,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0
    },
    form_wrapper: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
    },
    txt_i: {
        width: '90%',
        height: 60,
        fontSize: 18,
        fontWeight: '600',
        color: '#0D3665',
        marginVertical: 10,
        backgroundColor: '#d6e7f4cc',
        borderRadius: 8,
        paddingHorizontal: 20,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 8,
        marginLeft: SCREEN_WIDTH/1.6,
    },
    btn_txt: {
        fontSize: 22,
        color: '#006397',
        fontWeight: '600', 
        marginRight: 4,
    },
  })

export default Login