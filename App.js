import React, { Component } from 'react';
import {Alert,StyleSheet} from 'react-native';
import StackNav from './navigate/stackNav';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
export default function App() {

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert("App Update","Don't Worry; Your App Has Been Updated Successfully !")
        await Updates.reloadAsync();
      }
    } catch (error) {
    }
  }

  useEffect(()=>{
    onFetchUpdateAsync()
  },[])
  
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  );
}
