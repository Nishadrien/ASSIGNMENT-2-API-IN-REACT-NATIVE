import React,{useEffect,useState} from "react";




import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList } from 'react-native';

import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import ViewAllTutorial from './ViewAllTutorial';
import EditTutorial from './EditTutorial';
const Stack=createStackNavigator();

function HomeScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();
  
 const insert=()=>{

  fetch('https://task-app-adrien.herokuapp.com/api/tutorials', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: title,
    description: description
  })})
  .then((response) => {
    response.text();
    navigation.push('HomeScreen')
  })


 }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setTitle(text)
          }
          placeholder="Enter Tutorial Title"
          value={title} />

        <TextInput
          style={styles.textInputStyle}
          onChangeText={
            (text) => setDescription(text)
          }
          placeholder="Enter Tutorial Descriptions"
          value={description} />
           <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={insert}>

          <Text style={styles.touchableOpacityText}>Insert Tutorial</Text>

        </TouchableOpacity>
          <TouchableOpacity
          style={[styles.touchableOpacity, { marginTop: 20, backgroundColor: 'black' }]}
          onPress={()=>navigation.navigate('ViewAllTutorial')}>

          <Text style={styles.touchableOpacityText}>View Tutorial's List </Text>

        </TouchableOpacity>

</View>
</SafeAreaView>

)}



import messaging from '@react-native-firebase/messaging';
export default function App(){
    const requestUserPermission= async ()=>{
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
    }
    useEffect(()=>{
if(requestUserPermission()){
messaging().getToken().then(token=>{console.log(token)});
}
else{
    console.log("Failed token status",authStatus);
}
 // Check whether an initial notification is available
 messaging()
 .getInitialNotification()
 .then( async (remoteMessage) => {
   if (remoteMessage) {
     console.log(
       'Notification caused app to open from quit state:',
       remoteMessage.notification,
     );
   }
 });
 // Assume a message-notification contains a "type" property in the data payload of the screen to open

 messaging().onNotificationOpenedApp(async (remoteMessage) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

  return unsubscribe;

    },[])
    return (
      <NavigationContainer>
        <Stack.Navigator>
  
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ViewAllTutorial" component={ViewAllTutorial} />
          <Stack.Screen name="EditTutorial" component={EditTutorial} />
  
        
  
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
  
    touchableOpacity: {
      backgroundColor: 'black',
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
  
    touchableOpacityText: {
      color: '#FFFFFF',
      fontSize: 23,
      textAlign: 'center',
      padding: 8
    },
  
    textInputStyle: {
      height: 45,
      width: '90%',
      textAlign: 'center',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 7,
      margin: 15,
    },
  
    itemsStyle: {
      fontSize: 22,
      color: '#000'
    }
  });