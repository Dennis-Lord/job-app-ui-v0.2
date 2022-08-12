import { Text, View, StyleSheet } from 'react-native'
import React from 'react'

export const ErrorComponent = ({error_message}) => {

    return (
      <View style={styles_error.wrapper}>
        <Text style={styles_error.error_txt}>{error_message}</Text>
      </View>
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