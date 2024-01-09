import { Gesture, GestureDetector, State} from 'react-native-gesture-handler'
import Animated, { SharedValue, runOnJS, useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { CARD_HEIGHT, Card, CardProps } from "../Card";
import { useState } from 'react';
import { styles } from './styles';

type Props ={
    data: CardProps,
    cardPosition: SharedValue<number[]>, //Posições dos cartões
    scrollY:  SharedValue<number>,
    cardscount: number, //Quantidade de cartoes
}

export function MovableCard({data, cardPosition, scrollY, cardscount}: Props){

    const [moving, setMoving] = useState(false)
    const top = useSharedValue(cardPosition.value[data.id] * CARD_HEIGHT)

    const longPressGesture = Gesture
    .LongPress().onStart(() =>{
        // console.log("LongPress ativado")
       runOnJS(setMoving)(true)
    })
    .minDuration(200);

    const panGesture = Gesture
    .Pan()
    .manualActivation(true)
    .onTouchesDown((_ ,state) => {
        moving ? state.activate() : state.fail();
    })
    .onUpdate((event) =>{
        // console.log(event.absoluteY)
        top.value = event.absoluteY + scrollY.value;
    })

    const animatedStyled = useAnimatedStyle(() => {
        return {
            top: top.value - CARD_HEIGHT,
            opacity: moving ? 1 : 0.4
        }
    })

    return(
        <Animated.View style={styles.Container, animatedStyled}>
            {/* <GestureDetector gesture={longPressGesture}> */}
            <GestureDetector gesture={Gesture.Race(panGesture,longPressGesture)}>
                <Card data={data}/>
            </GestureDetector>
        </Animated.View>
    )
}