import {StyleSheet} from 'react-native'

export const HEIGHT = 68;
export const MARGIN_BOTTON = 12;

export const styles =  StyleSheet.create({
    
    Container:{
        width:'100%',
        height: HEIGHT,
        borderRadius: MARGIN_BOTTON,
        backgroundColor:"#595959",
        padding:16,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-between',        
    },
    
    Title:{
        fontWeight: 'bold',
        fontSize:18,
        color:"#fff", 
    },
        
});