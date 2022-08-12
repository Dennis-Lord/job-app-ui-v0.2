import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth';

export default function NavBtn({navigation}) {

    // handle sign out
    function SignOut(navigation) {
        Alert.alert(
            "Log Out",
            "Would you want to log out?",
            [
              {
                text: "Cancel",
                onPress: () => null,
              },
              { text: "Log out", onPress: () => 
                auth()
                .signOut()
                .then(() => {
                    navigation.navigate('AuthenticationScreen')
                }).catch((err) => {
                    navigation.navigate('AuthenticationScreen')
                })
            }
            ]
          );
        
    }

  return (
    <TouchableOpacity style={styles_navBtn.wrapper} onPress={() => SignOut(navigation)}>
        <View style={styles_navBtn.short}/>
        <View style={styles_navBtn.long}/>
    </TouchableOpacity>
  )
}

const styles_navBtn = StyleSheet.create({
    wrapper: {
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
    },
    short: {
        width: 14,
        height: 4,
        backgroundColor: '#000',
        marginBottom: 6,
        marginLeft: 10,
        borderRadius: 6,
    },
    long: {
        width: 29,
        height: 4,
        backgroundColor: '#000',
        marginLeft: 10,
        borderRadius: 6,
    }
})