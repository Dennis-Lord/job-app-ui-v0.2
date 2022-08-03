import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, Alert} from 'react-native'
import Animated from 'react-native-reanimated'
import React from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign';

import { Formik } from 'formik'
import * as Yup from 'yup'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const {width: SCREEN_WIDTH} = Dimensions.get('window')

const Login = ({navigation, reanimatedLoginSheet, trans}) => {
// LoginSchema
const LoginSchema = Yup.object().shape({ 
    email: Yup.string().email().required('An email is required'), 
    password: Yup.string().required().min(8, 'Password must have at least 8 characters'), 
  })
  
  

  const onLogin = (email, password, navigation) => {
    const user = [email, password]     
      navigation.navigate('MainScreen');
    }


  return (
    <Animated.View style={[Login_styles.wrapper, reanimatedLoginSheet]}>
      <Formik 
      initialValues={{email: '', password: ''}}
      onSubmit={values => onLogin(values.email, values.password, navigation)}
      validateOnMount={true}
      validationSchema={LoginSchema}
      
      >{({handleChange, handleSubmit, values}) => 
      <>
        <View style={Login_styles.header}>
            <TouchableOpacity style={Login_styles.back_btn} onPress={() => trans('back')}>
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
        position: 'absolute',
        top: 1,
        zIndex: 1,
        right: SCREEN_WIDTH
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
    }
  })

export default Login