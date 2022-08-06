import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import NavBtn from '../components/nav_btn.component'
import ScrollableSheet from './Scrollable.sheet'
// import Icon from 'react-native-vector-icons/FontAwesome'
import { COLOR_PALETTE } from '../data/app.data'

const {add_button_color} = COLOR_PALETTE
const {height: SCREEN_HEIGHT} = Dimensions.get('window')

const MainScreen = ({navigation}) => {
    
  return (
    <View style={styles_main.container}>
        {/**Navigation header */}
      <View style={styles_main.header}>
        <NavBtn navigation={navigation}/>
        <View style={styles_main.profile_wrapper}>
          <Image style={{width: '100%', height: '100%'}} source={require('../../assets/pexels-photo-1072179.jpeg')}/>
        </View>
      </View>

        {/**scrollable sheet */}
        <ScrollableSheet />
    </View>
  )
}

const styles_main = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: SCREEN_HEIGHT,
        width: '100%',
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        zIndex: 1,
        
    },
    profile_wrapper: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: '#137',
        overflow: 'hidden'
    },
    add_btn: {
      width: 60,
        height: 60,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: add_button_color,
        position: 'absolute',
        bottom: SCREEN_HEIGHT /26,
        right: 24,
    }
})

export default MainScreen
