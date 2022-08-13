import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import Animated,  { useAnimatedStyle, useSharedValue} from 'react-native-reanimated'
import SuccessComponent from '../components/success.component';
import ErrorComponent from '../components/error.component';

const {width: SCREEN_WIDTH} = Dimensions.get('window')
export const {height: SCREEN_HEIGHT} = Dimensions.get('window')
export const topPos = (SCREEN_HEIGHT / SCREEN_HEIGHT) - 100

export const Authentication = ({navigation}) => {
  // error message state variable
  const [err, setErr] = useState('')
  const pos_show = 100 // variable to translate error component

  GoogleSignin.configure({
    webClientId: '46844007905-l52m7papjefq78fhop0hujqgadct56pv.apps.googleusercontent.com',
  });
  
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential)
  }

  // handle animation to toggle error

  const handlePromiseRejection = (reject) => {
    if (reject === '7') {
      setErr('Network Error!')
      pos_value.value = pos_show;
      setTimeout(() => {
        pos_value.value = topPos;
      }, 3080)
  }}

  // handle animation to toggle error
  const pos_value = useSharedValue(0)

  const reanimatedErrorMessage = useAnimatedStyle(() => {
      const translateY = pos_value.value;
      return {
          transform: [{translateY: translateY,}],
      }
  })
 
  return (
    <View style={Auth.container}>
      <Animated.View style={[Auth.error_view, reanimatedErrorMessage]}>
        {err === 'Success!' || err === 'Account created!' ? 
        <SuccessComponent success_message={err}/>
        :
        <ErrorComponent error_message={err}/>
      }
      </Animated.View>
      <Image style={Auth.imageI} source={require('../../assets/logo.png')}/>
      <View style={Auth.wrapper}>
        <TouchableOpacity style={Auth.btn} onPress={() => 
        onGoogleButtonPress().then(
          () => {
            navigation.navigate('MainScreen')
          }, (reject) => {
            handlePromiseRejection(reject.code)
          }
        )
        }>
          <Text style={Auth.btnText}>Continue with Google</Text>
          <Image style={Auth.btnLogo} source={require('../../assets/google_logo.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={Auth.logInBtn}>Log in</Text>
        </TouchableOpacity>
      </View>
      <View style={Auth.footer}>
        <Text style={Auth.f_txt}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={Auth.f__txt}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}



const Auth = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#FFF',
    },
    imageI: {
        width: 260,
        height: 120,
        position: 'absolute',
        alignSelf: 'center',
        top: SCREEN_HEIGHT / 3.3
    },
    wrapper: {
      width: '100%',
      height: 100,
      position: 'absolute',
      bottom: SCREEN_HEIGHT / 3,
      marginTop: 20,
      alignItems: 'center'
    },
    btn: {
        height: 50,
        width: 300,
        borderRadius: 30,
        borderWidth: 1.2,
        borderColor: '#0D3665',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    }, 
    btnLogo: {
        width: 24,
        height: 24,
        position: 'relative',
        left: 32,
    },
    btnText: {
        color: '#0D3665',
        fontSize: 17,
        fontWeight: '700',
    },
    logInBtn: {
      fontSize: 20,
      fontWeight: '700',
      color: '#031D36',
      textAlign: 'center',
      marginTop: 12,
      letterSpacing: 0.1
    },
    footer: {
      width: '100%',
      height: 30,
      position: 'absolute',
      bottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    f_txt: {
      fontSize: 18,
      color: '#556777',
      paddingRight: 10,
      fontWeight: '600'
    },
    f__txt: {
      fontSize: 17,
      color: '#0099EA',
      paddingRight: 10,
      fontWeight: '700'
    },
    error_view:{
      width: '85%',
      minHeight: 50,
      position: 'absolute',
      top: topPos ,
      zIndex: 1,
      alignSelf: 'center'
  }
})
