// import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput} from 'react-native'
// import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
// import React, { useCallback, useState } from 'react'
// import AntIcon from 'react-native-vector-icons/AntDesign';

// import { Formik } from 'formik'
// import * as Yup from 'yup'
// import SignUp from './Sign_up.screen';
// import Login from './Log_in.screen';

// const {height: SCREEN_HEIGHT} = Dimensions.get('window')
// const {width: SCREEN_WIDTH} = Dimensions.get('window')



// export const Authentication = ({navigation}) => {
//   // useSharedValue variables to hold translate value
//   const selftranslateX = useSharedValue(0);
//   const selfzIndex = useSharedValue(2);

//   const translateX = useSharedValue(0);

//   const translateSX = useSharedValue(0);
//   const stackIndex = useSharedValue(0);

//   // function to translate authentication screen
//   const translateSelf = useCallback(() => {
//     'worklet';
//     stackIndex.value = 0;
//     selftranslateX.value = withSpring(-SCREEN_WIDTH, {damping: 45})
    
//     setTimeout(() => {
//       selfzIndex.value = 0
//     }, 1000)
//   }, [])

//   const reanimatedSelfSheet = useAnimatedStyle(() => {
//     return {
//       transform: [{translateX: selftranslateX.value}],
//       zIndex: selfzIndex.value,
//     }
//   })

//   const trans = useCallback((value) => {
    
//     if(value === 'sign') {
//       return translateSX.value = withSpring(-SCREEN_WIDTH, {damping: 30}),
//       translateX.value = withSpring(-SCREEN_WIDTH, {damping: 30})
//     }else if(value === 'login') {
//       return translateSX.value = withSpring(SCREEN_WIDTH * 2, {damping: 30}),
//       translateX.value = withSpring(SCREEN_WIDTH, {damping: 30})
//     }else if(value === 'goback') {
//       translateX.value = withSpring(0, {damping: 30})
//     }else if(value === 'back') { 
//       translateX.value = withSpring(0 , {damping: 30})
//     }
//   }, [])
  

//   const reanimatedAuthSheet = useAnimatedStyle(() => {
//     return {
//       transform: [{translateX: translateX.value}],
//     }
//   })

//  const reanimatedSignUPSheet = useAnimatedStyle(() => {
//    return {
//      transform: [{translateX: translateX.value}],
//      zIndex: stackIndex.value,
//    }
//  })

//  const reanimatedLoginSheet = useAnimatedStyle(() => {
//    return {
//      transform: [{translateX: translateX.value}],
//      zIndex: stackIndex.value,
//    }
//  })
 
//   return (
//     <Animated.View style={[self_styles.wrapper, reanimatedSelfSheet]}>
//     <Animated.View style={[Auth.container, reanimatedAuthSheet]}>
//       <Image style={Auth.imageI} source={require('../assets/logo.png')}/>
//       <View style={Auth.wrapper}>
//         <TouchableOpacity style={Auth.btn} onPress={() => 
        
//         navigation.navigate('MainScreen')
//         }>
//           <Text style={Auth.btnText}>Continue with Google</Text>
//           <Image style={Auth.btnLogo} source={require('../assets/google_logo.png')}/>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => trans('login')}>
//           <Text style={Auth.logInBtn}>Log in</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={Auth.footer}>
//         <Text style={Auth.f_txt}>Don't have an account?</Text>
//         <TouchableOpacity onPress={() => trans('sign')}>
//           <Text style={Auth.f__txt}>Sign up</Text>
//         </TouchableOpacity>
//       </View>
//     </Animated.View>
  
//     {/** Sign up animated view */}

//     <SignUp reanimatedSignUPSheet={reanimatedSignUPSheet} trans={trans} navigation={navigation}/>


//     {/** Login animated view */}
//     <Login navigation={navigation} reanimatedLoginSheet={reanimatedLoginSheet} trans={trans} />

//     </Animated.View>
//   )
// }

// const self_styles = StyleSheet.create({
//   wrapper: {
//     width: SCREEN_WIDTH,
//     height: SCREEN_HEIGHT,
//     position: 'absolute',
//     top: 1,
//     overflow: 'hidden',
//     borderRightWidth: 1,
//     borderRightColor: '#000',
//     backgroundColor: '#FFF'
//   }
// })


// const Auth = StyleSheet.create({
//     container: {
//         width: '100%',
//         height: SCREEN_HEIGHT-16,
//         backgroundColor: '#FFF',
//     },
//     imageI: {
//         width: 260,
//         height: 120,
//         position: 'absolute',
//         alignSelf: 'center',
//         top: SCREEN_HEIGHT / 3.3
//     },
//     wrapper: {
//       width: '100%',
//       height: 100,
//       position: 'absolute',
//       bottom: SCREEN_HEIGHT / 3,
//       marginTop: 20,
//       alignItems: 'center'
//     },
//     btn: {
//         height: 50,
//         width: 300,
//         borderRadius: 30,
//         borderWidth: 1,
//         borderColor: '#0D3665',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
        
//     }, 
//     btnLogo: {
//         width: 24,
//         height: 24,
//         position: 'relative',
//         left: 32,
//     },
//     btnText: {
//         color: '#0D3665',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     logInBtn: {
//       fontSize: 20,
//       fontWeight: '600',
//       color: '#031D36',
//       textAlign: 'center',
//       marginTop: 12,
//       letterSpacing: -0.6
//     },
//     footer: {
//       width: '100%',
//       height: 30,
//       position: 'absolute',
//       bottom: 10,
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     f_txt: {
//       fontSize: 16,
//       color: '#556777',
//       paddingRight: 10,
//       fontWeight: '600'
//     },
//     f__txt: {
//       fontSize: 16,
//       color: '#0099EA',
//       paddingRight: 10,
//       fontWeight: '600'
//     }
// })
