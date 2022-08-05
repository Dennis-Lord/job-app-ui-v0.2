import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { FlatList, Gesture, GestureDetector } from 'react-native-gesture-handler'

import Search from '../components/search.component'
import JobCard from '../components/card.component'
import { SAMPLE_DATA } from '../data/app.data'
import { COLOR_PALETTE } from '../data/app.data'
import { BottomSheet, BottomSheetRefProps } from './Bottom.sheet'
import _ from 'lodash'

const {height: Screen_Height} = Dimensions.get('window')
const {max_header_text_color,min_header_text_color, sub_text_color} = COLOR_PALETTE

export default function ScrollableSheet() {
    // state object 
    const [jobs, setJobs] = useState(SAMPLE_DATA);

    // function to get query, filter and return result
    const handlequery =( text )=> {
        const formattedquery = text.toLowerCase();
        if(formattedquery != '') {
        const data = _.filter(jobs, result => {
            if(result.city.toLowerCase().includes(formattedquery) || result.state.toLowerCase().includes(formattedquery)) {
                return true
            }else{
                return false
            }
        })

        setJobs(data)
        }else {
            setJobs(SAMPLE_DATA)
        }
    }


    // useState hook to hold and set state object to selected list item
    const [setText, isSetText] = useState({});


    // onPress code to reference bottomsheet component to show and hide bottomSheet
    const ref = useRef(null);
    const onPress = useCallback(
      (props) => {
        isSetText(props);
        const isActive = ref?.current?.isActive();
        const pre = ref?.current?.previousPosition();
        if(!isActive && pre <= -240) {
          ref?.current?.scrollTo(-240);
        }else {
            ref?.current?.scrollTo(-240);
        }
      },
      [],
    )
    
    // Gesture operation code

    const s_translateY = useSharedValue(0);
    const s_prevPostion = useSharedValue({y: 0});
    const S_MAX_TRANSLATE_Y = -Screen_Height ;
    const page_scrollTo = useCallback((destination) => {
        'worklet';
        s_translateY.value = withSpring(destination, {damping: 50})
    },[])

    const s_gesture = Gesture.Pan()
    .onStart(() => {
        s_prevPostion.value = {y: s_translateY.value}
    })
    .onUpdate((event) => {
        s_translateY.value = event.translationY + s_prevPostion.value.y;
        s_translateY.value = Math.max(s_translateY.value, S_MAX_TRANSLATE_Y)
    }).onEnd(() => {
        if(s_translateY.value < -Screen_Height / 100) {
            page_scrollTo(-Screen_Height / 6.5)
        }else if(s_translateY.value > -Screen_Height / 90) {
            page_scrollTo((-Screen_Height / 100) + 10 )
        }
    })

    

    const reanimatedScrollableSheet = useAnimatedStyle(() => {
        const translateY = interpolate(s_translateY.value, [0, -100], [0, -100], Extrapolate.CLAMP)
        return {
            transform: [{translateY: translateY}],
            height: '105%',
        }
    })

  return (
    <>
    <GestureDetector gesture={s_gesture}>
        <Animated.View style={[styles_scrollable_sheet.container, reanimatedScrollableSheet]}>
            <Text style={styles_scrollable_sheet.text_h3}>Where are you</Text>
            <Text style={styles_scrollable_sheet.text_h1}>looking for a job?</Text>
            <Search query={handlequery}/>
            <View style={styles_scrollable_sheet.text_wrapper}>
                <Text style={styles_scrollable_sheet.text_h5}>Jobs</Text>
                <Text style={styles_scrollable_sheet.text_h4}>for you</Text>
            </View>
            {/**FlatList to loop through SAMPLE_DATA and dislay job cards */}

            <FlatList
                data={jobs}
                keyExtractor={(key) => key.id.toString()}
                renderItem={({item}) => <JobCard onPress={() => onPress(item)} id={item.id} job_title={item.job_title} payment_offer={item.payment_offer} logo={item.logo}/>}
            />
        </Animated.View>
    </GestureDetector>

    {/* BottomSheet */}
    <BottomSheet ref={ref} sheetData={setText}/>
    </>
  )
}

const styles_scrollable_sheet = StyleSheet.create({
    container: {
        width: '100%',
        height: Screen_Height + 10,
        backgroundColor: '#FFF',
    },
    text_h3: {
        fontSize: 28,
        color: min_header_text_color,
        fontWeight: '300',
        marginVertical: 6,
        marginHorizontal: 18
    },
    text_h1: {
        fontSize: 28,
        color: max_header_text_color,
        fontWeight: '600',
        marginBottom: 20,
        marginHorizontal: 18
    },
    text_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginVertical: 10,
    },
    text_h5: {
        fontSize: 18,
        color: sub_text_color,
        fontWeight: '300',
        marginRight: 5,
    },
    text_h4: {
        fontSize: 18,
        color: sub_text_color,
        fontWeight: '600',
    }
})