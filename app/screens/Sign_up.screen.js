import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, TextInputComponent} from 'react-native'
import React from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign';

import { Formik } from 'formik'
import * as Yup from 'yup'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const {width: SCREEN_WIDTH} = Dimensions.get('window')

const SignUp = ({navigation}) => {
    // signUpSchema
    const  SignUpSchema = Yup.object().shape({
    username: Yup.string().required('Please set a username'), 
    email: Yup.string().email().required('An email is required'), 
    password: Yup.string().required().min(8, 'Password must have at least 8 characters'), 
  })

  const onSignUp = (username, email, password, navigation) => {
    const user = [username, email, password]
    navigation.navigate('MainScreen');
  }

  return (
    <View style={SignUp_styles.wrapper}>
      <Formik 
      initialValues={{username: '', email: '', password: ''}}
      onSubmit={ values => {onSignUp(values.username, values.email, values.password, navigation)}}
        validateOnMount={true}
        validationSchema={SignUpSchema}
      >{({handleChange, handleSubmit, values}) => 
      <>
        <View style={SignUp_styles.header}>
            <TouchableOpacity style={SignUp_styles.back_btn} onPress={() => navigation.goBack()}>
                  <AntIcon name={'arrowleft'} size={26} color='#000'/>
            </TouchableOpacity>
            <Text style={SignUp_styles.h_txt}>Create account</Text>
        </View>
        <View style={SignUp_styles.form_wrapper}>
            {/** form */}
            <TextInput style={SignUp_styles.txt_i} 
            placeholder={'Username'}
            placeholderTextColor={'#0D3665'} 
            autoFocus={false} 
            autoCapitalize='none'
            textContentType='username'
            onChangeText={handleChange('username')}
            value={values.username}/>

            <TextInput style={SignUp_styles.txt_i} 
            placeholder={'Email'}
            placeholderTextColor={'#0D3665'} 
            autoFocus={false} 
            autoCapitalize='none'
            textContentType='emailAddress'
            keyboardType='email-address'
            onChangeText={handleChange('email')}
            value={values.email}/>

            <TextInput style={SignUp_styles.txt_i} 
            placeholder={'Password'}
            placeholderTextColor={'#0D3665'} 
            autoCorrect={false}
            textContentType='password'
            onChangeText={handleChange('password')}
            keyboardType={'visible-password'}
            value={values.password}/>

            {/** submit button */}
            <TouchableOpacity onPress={() => handleSubmit()}>
                <View style={SignUp_styles.btn}>
                    <Text style={SignUp_styles.btn_txt}>Create</Text>
                    <AntIcon name={'arrowright'} size={24} color='#006397'/>
                </View>
            </TouchableOpacity>
        </View>
        </>}
      </Formik>
    </View> 
  )
}

const SignUp_styles = StyleSheet.create({
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
    }
  })

export default SignUp;

