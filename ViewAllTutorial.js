
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, FlatList, Text, View ,StyleSheet, TouchableOpacity,Alert,TextInput,Image} from 'react-native';

export default function App () {
const navigation=useNavigation();
const [event,setEvent]=useState();

useEffect(()=>{
 fetch("https://task-app-adrien.herokuapp.com/api/tutorials/all")
.then((response)=>response.json())
.then((data)=>setEvent(data));

},[])

 
  
  return (
    <View style={styleses.container}>
      <FlatList
      keyExtractor={(item)=>item._id}
        data={event}
        renderItem={({item})=>
      <View>
       <TouchableOpacity onPress={()=>navigation.navigate('EditTutorial',{
    item: item
        })}>
        <Text style={styleses.text}></Text><Text>Title:{item.title} Description:{item.description}</Text>
     </TouchableOpacity>


</View>
        }
      />
    
    </View>
  )
    }
  const styleses=StyleSheet.create({
container:{

marginTop:50
},
text:{
textAlign:'center',
fontSize:18
},
input:{
backgroundColor:'blue',
padding:10,
width:300,
marginLeft:20,
textAlign:'center'
},
get:{
width:120,
height:200,
marginTop:40,
marginLeft:130
},
  })