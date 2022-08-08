// navigation
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screen imports
import { Authentication } from '../screens/Authentication.screen'
import MainScreen from '../screens/Main.screen'
import Login from '../screens/Log_in.screen'
import SignUp from '../screens/Sign_up.screen'

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator 
       initialRouteName='AuthenticationScreen' 
       screenOptions= {{headerShown: false}}>
        <Stack.Screen name='AuthenticationScreen' component={Authentication}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignUP' component={SignUp}/>
        <Stack.Screen name='MainScreen' component={MainScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Navigation