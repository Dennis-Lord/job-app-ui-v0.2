import { Image, StyleSheet} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR_PALETTE } from '../data/app.data'

const {button_color} = COLOR_PALETTE

export default function Btn() {
  return (
    <TouchableOpacity style={styles_btn.container}>
      <Image style={{width: '60%', height: '60%'}} source={require('../../assets/7472557.png')}/>        
    </TouchableOpacity>
  )
}

const styles_btn = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: button_color,
        marginLeft: 10,
    }
})