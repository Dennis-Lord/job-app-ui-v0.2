// navigation
import React, {useState, useEffect} from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// firebase imports
import auth from '@react-native-firebase/auth'

// screen imports
import { Authentication } from '../screens/Authentication.screen'
import MainScreen from '../screens/Main.screen'
import Login from '../screens/Log_in.screen'
import SignUp from '../screens/Sign_up.screen'

const Stack = createNativeStackNavigator();

const Navigation = () => {
// Set an initializing state whilst Firebase connects
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();

// Handle user state changes
const onAuthStateChanged = (user) => {
  setUser(user);
  if (initializing) {setInitializing(false);}
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);

if (initializing) return null;

if(!user) {
  return (
    <NavigationContainer>
    <Stack.Navigator 
       initialRouteName={'AuthenticationScreen'} 
       screenOptions= {{headerShown: false}}>
        <Stack.Screen name='AuthenticationScreen' component={Authentication}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }else {
    return (
      <NavigationContainer>
      <Stack.Navigator 
         initialRouteName={'MainScreen'} 
         screenOptions= {{headerShown: false}}>
          <Stack.Screen name='MainScreen' component={MainScreen}/>
        </Stack.Navigator>
      </NavigationContainer>)
  }
}

export default Navigation