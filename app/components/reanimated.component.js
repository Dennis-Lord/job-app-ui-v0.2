import { StyleSheet } from 'react-native'
import React from 'react'
import Animated,  { useAnimatedStyle} from 'react-native-reanimated'
import SuccessComponent from './success.component'
import ErrorComponent from './error.component'
import { topPos } from '../screens/Authentication.screen'

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
      <Animated.View style={[reanimated_styles.error_view, reanimatedErrorMessage]}>
        {error_message === 'Success!' || error_message === 'Account created!' ? 
        <SuccessComponent success_message={error_message}/>
        :
        <ErrorComponent error_message={error_message}/>
      }
      </Animated.View>
    )
}

const reanimated_styles = StyleSheet.create({
    error_view:{
        width: '85%',
        minHeight: 50,
        position: 'absolute',
        top: topPos ,
        zIndex: 1,
        alignSelf: 'center'
    }
})

