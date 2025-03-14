import React, { Component } from 'react';
import {Alert,StyleSheet} from 'react-native';
import StackNav from './navigate/stackNav';
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  );
}
