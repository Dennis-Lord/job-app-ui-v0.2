import { Dimensions, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { forwardRef, useCallback, useImperativeHandle } from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR_PALETTE } from '../data/app.data'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const {max_header_text_color, sub_text_color,button_color} = COLOR_PALETTE

type BottomSheetProps = {
    sheetData?: object; 
}
export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
    previousPosition: () => number; 
}

export const BottomSheet = forwardRef<BottomSheetProps, BottomSheetRefProps>(
    ({sheetData}, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const prevPostion = useSharedValue({y: 0});
    const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 66;

    const scrollTo = useCallback((destination) => {
        'worklet';

        // if(destination === 0) {
        //     active.value = false;
        // }else{
        //     active.value = true;
        // }
        // conditional statement represents un-refacted code of active.value = destination != o below

        active.value = destination != 0;
        translateY.value = withSpring(destination, {damping: 50})
    },[])

    const isActive = useCallback(() => {
        return active.value ;
    }, [])

    const previousPosition = useCallback(() => {
        return translateY.value;
    }, [])

    useImperativeHandle(
      ref,
      () => ({
       scrollTo, isActive, sheetData,previousPosition
      }),
      [scrollTo, isActive, sheetData],
    )

    const gesture = Gesture.Pan()
    .onStart(() => {
        prevPostion.value = {y: translateY.value}
    }).onUpdate((event) => {
        translateY.value = event.translationY + prevPostion.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
        if(translateY.value > -SCREEN_HEIGHT / 3) {
            scrollTo(0)
        }else if(translateY.value < -SCREEN_HEIGHT / 1.9) {
            scrollTo(MAX_TRANSLATE_Y)
        }
    });

    // useEffect(() => {
    //     scrollTo(-SCREEN_HEIGHT/3)
    // }, [])
    

    const reanimatedBottomSheet = useAnimatedStyle(() =>{ 
        const borderRadius = interpolate(
            translateY.value, [MAX_TRANSLATE_Y + 40, MAX_TRANSLATE_Y], [25, 0],
            Extrapolate.CLAMP
        )
        return {
            borderRadius,
            transform: [{translateY: translateY.value}],
            borderWidth: 0.6,
        };}
    );

  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, reanimatedBottomSheet]}>
        <View style={styles.line}/>
            <View  style={styles.top_wrapper}>
                <View style={styles.logo}>
                    <Image style={{width: '100%', height: '100%'}}  source={sheetData.logo}/>
                </View>
                <View style={styles.profiling}>
                    <Text style={styles.profiling_text}>{sheetData.job_title}</Text>
                    <View style={styles.location}>
                        <Image  style={{width: 20, height: 20}} source={require('../assets/2991231.png')}/>
                        <Text style={styles.loc_text}>
                            {sheetData.city}, {sheetData.state}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.mid_wrapper}>
                <View style={styles.left}>
                    <Text style={styles.main_text}>Working Hours</Text>
                    <Text style={styles.sub_text}>{sheetData.working_hours}</Text>
                </View>
                <View style={styles.mid_line}/>
                <View style={styles.right}>
                    <Text style={styles.main_text}>Equipment</Text>
                    <Text style={styles.sub_text}>{sheetData.equipment}</Text>
                </View>
            </View>
            <View >
                <View style={styles.header_wrapper}>
                    <Text style={styles.text_h5}>Job</Text><Text style={styles.text_h4}>description</Text>
                </View>
                <ScrollView alwaysBounceVertical showsVerticalScrollIndicator={false} style={styles.scrollview}>
                    <Text style={styles.description_text}>{sheetData.job_description}</Text>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button_b}>
                    <Image  style={{width: 24, height: 24, marginRight: 3}} source={require('../assets/271220.png')}/>    
                </TouchableOpacity> 
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_text}>Submit an application</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    </GestureDetector>
  )
})

export const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: '#FFF',
        position: 'absolute',
        top: SCREEN_HEIGHT,
        borderRadius: 25,
    },
    line: {
        width: 64,
        height: 4,
        backgroundColor: sub_text_color,
        alignSelf: 'center',
        marginVertical: 14,
        borderRadius: 6,
    },
    top_wrapper: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 14,
        borderColor: sub_text_color,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_b: {
        width: 60,
        height: 60,
        borderRadius: 14,
        borderColor: sub_text_color,
        borderWidth: 0.6,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profiling: {
        flexDirection: 'column',
        marginHorizontal: 20,
    },
    profiling_text: {
        fontSize: 24,
        fontWeight: '700',
        color: max_header_text_color,
        width: 270,
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    loc_text: {
        fontSize: 14,
        fontWeight: '500',
        color: sub_text_color,
        marginLeft: 8,
    },
    mid_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    left: {
        flexDirection: 'column',
        width: 110,
    }, 
    mid_line: {
        height: 60,
        width: 1.5,
        backgroundColor: sub_text_color,
        marginHorizontal: 14,
        alignSelf: 'center'
    },
    right: {
        flexDirection: 'column',
        width: '50%',
    },
    main_text: {
        fontSize: 14,
        fontWeight: '500',
        color: sub_text_color,
        marginVertical: 6
    },
    sub_text: {
        fontSize: 22,
        fontWeight: '700',
        color: max_header_text_color,
    },
    header_wrapper: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: 14,
        marginBottom: 6,
    },
    text_h5: {
        fontSize: 20,
        color: sub_text_color,
        fontWeight: '400',
        marginRight: 5,
    },
    text_h4: {
        fontSize: 20,
        color: '#000',
        fontWeight: '600',
    },
    scrollview: {
        width: '100%',
        height: 210,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    description_text: {
        fontSize: 18,
        color: sub_text_color,
        fontWeight: '400',
        lineHeight: 24,
    },
    footer: {
        width: '100%',
        height: 70,
        position: 'absolute',
        bottom: 80,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    button: {
        width: 220,
        height: 60,
        borderRadius: 14,
        backgroundColor: button_color,
        alignItems: 'center',
        justifyContent: 'center',

    },
    button_text: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        marginRight: 5,
    }
})