import React, { use } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import {StatusBar,Platform} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chplist from "../components/chplist"
import { Ionicons } from "@expo/vector-icons";
import Bookmark from "../components/bookmark";
import Bhakti from "../components/bhakti";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";
import { useState , useEffect } from "react";
import Settings from "../components/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab  = createBottomTabNavigator()

export default function TabNav(){
    const[tabTheme,setTabTheme]=useState(null)
    const[theme,setTheme]=useState(false)
    const getTheme=async()=>{
      const value = await AsyncStorage.getItem('Theme')
      setTheme(value)
    }

    useEffect(()=>{
      getTheme()
    })

    return(
        <Tab.Navigator
          screenOptions={({route})=>({ 
            tabBarIcon:({focused,color,size}) => {
              let iconName;
              if(route.name === 'Main'){ 
                iconName = focused?'home':'home-outline'; 
              }
              else if(route.name === 'Bookmarks'){ 
                iconName = focused?'bookmarks':'bookmarks-outline'; 
              } 
              else if(route.name === 'Settings'){ 
                iconName = focused?'settings':'settings-outline';
              }   

              if(route.name === 'Bhakti'){
                return <MaterialCommunityIcons name="hands-pray" size={size} color={color} />
              }
              else{
                return<Ionicons name={iconName} size={size} color={color} />
              }
            }, 
            tabBarActiveTintColor:tabTheme!=null ? (tabTheme === "Dark"?"white":"black") : (theme==="Dark" ? "white" : "black"),
            tabBarInactiveTintColor:tabTheme!=null ? (tabTheme === "Dark"?"#5A6A78":"#838383") : (theme==="Dark" ? "#5A6A78" : "#838383"),
            tabBarStyle:{
              backgroundColor:(tabTheme!=null ? (tabTheme === "Dark"?"black":"white") : (theme==="Dark" ? "black" : "white")),
              height:RFValue(50),
              borderColor:tabTheme!=null ? (tabTheme === "Dark"?"#5A6A78":"#838383") : (theme==="Dark" ? "#5A6A78" : "#838383"),
              borderTopWidth:RFValue(1)
            },
            tabBarLabelStyle:{fontFamily:"Roboto",fontWeight:"bold",fontSize:RFValue(11)},
        
          })
          } >
          <Tab.Screen name = "Main" component = {Chplist} options={{headerShown: false}}/>
          <Tab.Screen name = "Bookmarks" component = {Bookmark} options={{headerShown: false}}/>
          <Tab.Screen name = "Bhakti" component={Bhakti} options={{headerShown:false}} />
          <Tab.Screen name = "Settings" options={{headerShown:false}}>
            {()=>{
              return(
                <Settings changeTheme = {(value)=>{setTabTheme(value)}} />
              )
            }}
          </Tab.Screen>
        </Tab.Navigator>
      )
  
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
})