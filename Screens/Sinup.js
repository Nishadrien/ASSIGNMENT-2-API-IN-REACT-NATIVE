import { useNavigation } from "@react-navigation/native";
import React from "react";
import {View,Text,StyleSheet} from 'react-native';
export default function SignUp({route}){
    const navigation=useNavigation();
const item=route.getParam('data');
    return(

        <View style={styles.container}>
        <Text style={styles.text}>Login Page here{item.params.name}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
    flex:1
    },
    text:{
        fontSize:17,
        color:'indigo'
    }
    
    
    })