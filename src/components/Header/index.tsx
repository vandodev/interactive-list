import { View,Text } from "react-native";

import {styles} from "./styles"

export function Header(){
    return(
        <View style={styles.Container}>
            <Text style={styles.Title}>Categorias</Text>
            <Text style={styles.SubTitle}>Defina a sequência de prioridade</Text>
        </View>
    )
}