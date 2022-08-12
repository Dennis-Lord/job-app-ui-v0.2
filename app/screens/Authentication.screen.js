import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const {width: SCREEN_WIDTH} = Dimensions.get('window')

GoogleSignin.configure({
  webClientId: '46844007905-l52m7papjefq78fhop0hujqgadct56pv.apps.googleusercontent.com',
});

export const Authentication = ({navigation}) => {

  
 
  return (
    <View style={Auth.container}>
      <Image style={Auth.imageI} source={require('../../assets/logo.png')}/>
      <View style={Auth.wrapper}>
        <TouchableOpacity style={Auth.btn} onPress={() => 
        
        navigation.navigate('MainScreen')
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
    }
})
