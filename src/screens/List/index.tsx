import { ScrollView, View } from "react-native";
import {styles} from './styles'

import {CARDS} from '../../data/cards'

import {Header} from "../../components/Header"
import {Card} from "../../components/Card"


export function List(){
    return(
        <View style={styles.Container}>

            <Header />

            <ScrollView
                style={styles.List}
                showsVerticalScrollIndicator={false}
            >

                {
                    CARDS.map((item) => (
                        <Card
                            key={item.id}
                            data={item}
                        />
                    ))
                }

            </ScrollView>
        </View>
    )
}