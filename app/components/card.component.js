import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR_PALETTE } from '../data/app.data'

const {button_color, sub_text_color,max_header_text_color} = COLOR_PALETTE

export default function JobCard({onPress,job_title, payment_offer, id, logo}) {
  return (
    <Pressable onPress={onPress}>
        <View style={id == 1 ? styles_job_card.container_blue : styles_job_card.container}>
            <View style={id == 1 ? styles_job_card.logo_blue : styles_job_card.logo}>
                <Image style={{width: '90%', height: '90%', alignSelf: 'center'}} source={logo}/>
            </View>
            <View style={id == 1 ? styles_job_card.line_blue : styles_job_card.line} />
            <View style={styles_job_card.wrapper}>
                <Text style={id == 1 ? styles_job_card.title_blue : styles_job_card.title} >{job_title}</Text>
                <View style={styles_job_card.pricing_wrapper}>
                    <View style={styles_job_card.price_wrapper}>
                        <Image style={{width: 14, height: 14}} source={require('../../assets/2150150.png')}/>
                    </View>
                    <Text style={id == 1 ? styles_job_card.pricing_blue : styles_job_card.pricing}>{payment_offer}</Text>
                </View>
            </View>
        </View>
    </Pressable>
  )
}

const styles_job_card = StyleSheet.create({
    container: {
        height: 100,
        width: '94%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignSelf: 'flex-end',
        marginBottom: 5,
        marginTop: 5,
        paddingLeft: 30,
        borderWidth: 0.6,
        borderColor: sub_text_color
    },
    container_blue: {
        height: 100,
        width: '94%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: button_color,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignSelf: 'flex-end',
        marginBottom: 5,
        marginTop: 5,
        paddingLeft: 30,
        borderWidth: 0.6,
        borderColor: button_color,
    },
    logo: {
        width: 46,
        height: 46,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
        
    }, 
    logo_blue: {
        width: 46,
        height: 46,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    line: {
        height: 30,
        width: 1.5,
        backgroundColor: sub_text_color,
        marginHorizontal: 16,
    },
    line_blue: {
        height: 30,
        width: 1.5,
        backgroundColor: '#FFF',
        marginHorizontal: 16,
    },
    wrapper: {
        flexDirection: 'column',
        marginHorizontal: 5,
    },  
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: max_header_text_color,
        marginBottom: 4,
        width: 250,
    },
    title_blue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 4,
        width: 250,
    },
    pricing_wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price_wrapper: {
        borderWidth: 1.5,
        borderRadius: 50,
        width: 20,
        height: 20,
        borderColor: '#72bc38',
        justifyContent: 'center',
        alignItems: 'center', 
        marginRight: 8,
    },
    pricing: {
        fontSize: 16,
        fontWeight: '400',
        color: sub_text_color,
    },
    pricing_blue: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFF',
    }
})


