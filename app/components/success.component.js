import { Text, View, StyleSheet } from 'react-native'
import React from 'react'

export const SuccessComponent = ({success_message}) => {

    return (
      <View style={styles_success.wrapper}>
        <Text style={styles_success.error_txt}>{success_message}</Text>
      </View>
    )
}

const styles_success = StyleSheet.create({
    wrapper: {
        width: '80%',
        minHeight: 50,
        backgroundColor: '#d1e7dd',
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
        color: '#0f5132'
    }
})

export default SuccessComponent