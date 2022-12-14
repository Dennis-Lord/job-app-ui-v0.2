import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import Animated,  { useAnimatedStyle} from 'react-native-reanimated'
import SuccessComponent from './success.component'


const ErrorComponent = ({error_message}) => {

    return (
      <View style={styles_error.wrapper}>
        <Text style={styles_error.error_txt}>{error_message}</Text>
      </View>
    )
}

export const AnimatedErrorComponent = ({error_message, s_value}) => {
    // handle animation to toggle error
    const pos_value = s_value;

    const reanimatedErrorMessage = 
    useAnimatedStyle(() => {
        const translateY = pos_value;
        return {
            transform: [{translateY: translateY,}],
        }
    })

    return (
      <Animated.View style={[styles_error.error_view, reanimatedErrorMessage]}>
        {error_message === 'Success!' || error_message === 'Account created!' ? 
        <SuccessComponent success_message={error_message}/>
        :
        <ErrorComponent error_message={error_message}/>
      }
      </Animated.View>
    )
}

const styles_error = StyleSheet.create({
    wrapper: {
        width: '80%',
        minHeight: 50,
        backgroundColor: '#f8d7da',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        top: 6,
        zIndex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    error_txt:{
        fontSize: 15,
        fontWeight: '700',
        color: '#a6383b'
    }
})

export default ErrorComponent