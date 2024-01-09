import { View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import {styles} from './styles'

import {CARDS} from '../../data/cards'

import {Header} from "../../components/Header"
import {MovableCard} from "../../components/MovableCard"
import { CARD_HEIGHT } from "../../components/Card";


export function List(){

    const scrolly = useSharedValue(0);
    const cardsPosition = useSharedValue(listToObject(CARDS))

    const handleScroll = useAnimatedScrollHandler((event) => {
        // console.log(event.contentOffset.y);
        scrolly.value = (event.contentOffset.y);
    })

    function listToObject(List: typeof CARDS){
        const listOfCards = Object.values(List)
        // console.log(listOfCards)

        const object: any ={}
        listOfCards.forEach((card, index) =>{
            object[card.id] = index
        });

        // console.log(object)
        return object;
    }

    return(
        <View style={styles.Container}>

            <Header />

            <Animated.ScrollView
                style={styles.List}
                contentConteinerStyle={{height: CARDS.length * CARD_HEIGHT}}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle= {16} //Para ter resposta de rolagem mais rápidas principalmente no ios
            >

                {
                    CARDS.map((item) => (
                        <MovableCard
                            key={item.id}
                            data={item}
                            scrollY={scrolly}
                            cardPosition={cardsPosition}
                            cardscount={CARDS.length}
                        />
                    ))
                }

            </Animated.ScrollView>
        </View>
    )
}