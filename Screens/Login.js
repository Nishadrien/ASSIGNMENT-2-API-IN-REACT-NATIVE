import React from "react";
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
export default function App(props){
    const data={name:'adrien'};
const navigation=useNavigation();
return(
<View style={styles.container}>

<Text style={styles.text}>Login Page</Text>
<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('sine',{data})} ><Text>Go To SignUp</Text></TouchableOpacity>
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
},
button:{
    color:'white'
}


})