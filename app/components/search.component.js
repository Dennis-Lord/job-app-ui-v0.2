import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Btn from './btn.component'
import { COLOR_PALETTE } from '../data/app.data'

const {sub_text_color,min_header_text_color} = COLOR_PALETTE

export default function Search({query}) {

  return (
    <View style={styles_search_component.container}>
        <View style={styles_search_component.wrapper}>
        <Image  style={{width: 22, height: 22, marginHorizontal: 8}} source={require('../../assets/149852.png')}/>
            <TextInput
                style={styles_search_component.t_input} 
                placeholder='Search for a location...'
                placeholderTextColor={sub_text_color} onChangeText={query}/>
        </View>
        <Btn/>
    </View>
  )
}

const styles_search_component = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    wrapper: {
        width: 260,
        height: 60,
        borderRadius: 10,
        borderWidth: 0.7,
        borderColor: 'gray',
        alignItems: 'center',
        paddingHorizontal: 12,
        flexDirection: 'row'
    },
    t_input: {
        fontSize: 18,
        fontWeight: '600',
        width: 200,
        color: min_header_text_color,
        flexDirection: 'row',
        paddingHorizontal: 6,
    }
})