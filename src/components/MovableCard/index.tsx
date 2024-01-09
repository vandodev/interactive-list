import { Gesture, GestureDetector, State} from 'react-native-gesture-handler'
import Animated, { SharedValue, runOnJS, useSharedValue, useAnimatedStyle, withTiming, withSpring } from "react-native-reanimated";
import { CARD_HEIGHT, Card, CardProps } from "../Card";
import { useState } from 'react';
import { styles } from './styles';
import { CARDS } from '../../data/cards';

type Props ={
    data: CardProps,
    cardPosition: SharedValue<number[]>, //Posições dos cartões
    scrollY:  SharedValue<number>,
    cardscount: number, //Quantidade de cartoes
}

export function MovableCard({data, cardPosition, scrollY, cardscount}: Props){

    const [moving, setMoving] = useState(false)
    const top = useSharedValue(cardPosition.value[data.id] * CARD_HEIGHT)

    function objectMove(positions: number[], from: number, to: number){
        const newPositions = Object.assign({}, positions);

        for(const id in positions){
            if(positions[id] === from ){
                newPositions[id] = to;
            }

            if(positions[id] === to ){
                newPositions[id] = from;
            }
        
        }

        return newPositions
    }

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
    .onUpdate((event) => {
        // console.log(event.absoluteY)
        const positionY = event.absoluteY + scrollY.value;
        top.value = positionY - CARD_HEIGHT;

        const startPositionList = 0;
        const endpositionList = cardscount - 1;
        const currentPosition = Math.floor(positionY / CARD_HEIGHT);

        const newPosition = Math.max(startPositionList, Math.min(currentPosition, endpositionList));

        if(newPosition !== cardPosition.value[data.id]){
            cardPosition.value = objectMove(cardPosition.value, cardPosition.value[data.id], newPosition)
        }
    })
    .onFinalize(() => {
        runOnJS(setMoving)(false)
    })

    const animatedStyled = useAnimatedStyle(() => {
        return {
            top: top.value - CARD_HEIGHT,
            zIndex: moving ? 1 : 0,
            opacity: withSpring(moving ? 1 : 0.4)
        }
    },[moving])

    return(
        <Animated.View style={styles.Container, animatedStyled}>
            {/* <GestureDetector gesture={longPressGesture}> */}
            <GestureDetector gesture={Gesture.Race(panGesture,longPressGesture)}>
                <Card data={data}/>
            </GestureDetector>
        </Animated.View>
    )
}