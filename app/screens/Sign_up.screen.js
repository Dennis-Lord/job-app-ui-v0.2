import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput} from 'react-native'
import React, {useState} from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign';
import Animated, {useAnimatedStyle,useSharedValue} from 'react-native-reanimated';
import auth from '@react-native-firebase/auth'

import { Formik } from 'formik'
import * as Yup from 'yup'

import SuccessComponent from '../components/success.component';
import ErrorComponent from '../components/error.component';


const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const {width: SCREEN_WIDTH} = Dimensions.get('window')

const SignUp = ({navigation}) => {
// error message state variable
const [err, setErr] = useState('Error')
const pos_show = 100 // variable to translate error component

    // signUpSchema
    const  SignUpSchema = Yup.object().shape({
    username: Yup.string().required('Please set a username'), 
    email: Yup.string().email().required('An email is required'), 
    password: Yup.string().required().min(8, 'Password must have at least 8 characters'), 
  })

  const onSignUp = (username, email, password, navigation) => { 
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setErr('Account created!')
            pos_value.value = pos_show;
            setTimeout(() => {
            pos_value.value = 0
            navigation.navigate('MainScreen')
          }, 1080)
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setErr('Email address is already in use!')
            pos_value.value = pos_show;
          }else if (error.code === 'auth/invalid-email') {
            setErr('Invalid email!')
            pos_value.value = pos_show;
          } else {
          setErr(error.code.slice(5,30))
            pos_value.value = pos_show; 
        }
        }
      );

  }

  // handle animation to toggle success message
  const pos_value = useSharedValue(0)

  const reanimatedErrorMessage = 
  useAnimatedStyle(() => {
      const translateY = pos_value.value;
      return {
          transform: [{translateY: translateY,}],
      }
  })

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
        <Animated.View style={[SignUp_styles.error_view,reanimatedErrorMessage]}>
                {err === 'Account created!' ?
                <SuccessComponent success_message={err}/> : 
                <ErrorComponent error_message={err}/>}
            </Animated.View>
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
    },
    error_view:{
        width: '90%',
        minHeight: 50,
        position: 'absolute',
        top: (SCREEN_HEIGHT / SCREEN_HEIGHT) - 100 ,
        zIndex: 1
    }
  })

export default SignUp;

