import {MaterialIcons} from '@expo/vector-icons'
import { View, Text } from 'react-native';
import {HEIGHT, MARGIN_BOTTON, styles} from './styles'

export const CARD_HEIGHT = HEIGHT + MARGIN_BOTTON;

export type CardProps = {
    id: number,
    title: string
}

type Props = {
    data : CardProps
}

export function Card({data}: Props){
    return(
        <View style={styles.Container}>

            <Text style={styles.Title}>
                {data.title}
            </Text>
            
            <MaterialIcons
                name="drag-indicator"
                size={32}
                color="#EEE"            
            />

        </View>
    )
}