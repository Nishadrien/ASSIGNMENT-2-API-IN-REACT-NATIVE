import React, { useState, useEffect } from 'react';

import {  Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';


export default function App({ route, navigation }){
    const { item } = route.params;
   const[title,setTitle]=useState(item.title)
   const[description,setDescription]=useState(item.description)
     
      const Edit=(_id)=>{
        fetch(`https://task-app-adrien.herokuapp.com/api/tutorials/${item._id}`, {
            method: 'PUT',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
              title: title,
              description:description,
            
            }),
          })
      .then((response) => {
        response.text();
        navigation.push('ViewAllTutorial')
      });
    }
  
    const deleteData = (_id) => {
        fetch(`https://task-app-adrien.herokuapp.com/api/tutorials/${item._id}`, {
            method: 'DELETE'
          })
      .then((response) => {
        response.text();
        navigation.push('ViewAllTutorial')
      });



    }
     
    return (
        
 <View style={styles.container}>
      <TextInput
       
        onChangeText={(value) => setTitle(value)}
        style={styles.input}
        value={title}
      />
      <TextInput
     
        onChangeText={(value) => setDescription(value)}
        style={styles.input}
        value={description}
      />  
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={Edit}>
          <View style={{ backgroundColor: 'blue', padding: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Update</Text>
            </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={deleteData}>
          <View style={{ backgroundColor: 'red',width:50,height:30,marginLeft:280}}>
            <Text style={styles.del}>Delete</Text>
          </View>
        </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 15,
      backgroundColor: '#fff',
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginVertical: 5,
    },
    del:{
        height: 100,
        width: 100,
        padding:0  
    }
  });