import * as React from "react";
import {
  View , 
  Text , 
  ImageBackground,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator
  } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import chplist from "../chplist.json"
import {RFValue} from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
const {width,height} = Dimensions.get('window')``

const Verselist1=({data})=>{
  const {navigate} = useNavigation()
  var theme = data.theme
  console.log(theme)
  var chpid = data.chpid
  var chpid1 = chpid < 10 ? "0"+chpid : chpid
  var main = chplist[0][chpid]
  var chpogname = data.chpogname

  const renderItem =(item)=>{
    if(item.item.id > 0){return(
      <TouchableOpacity style={styles.card} 
      onPress={()=>{navigate("Hverse",{cid:item.item.id ,chpid : item.item.chp , chpname : item.item.name,theme:theme})}}>
        <LinearGradient
          start={[0,0]}
          end={[1,1]}
          style={styles.card1}
          colors={theme=="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#1d0093','#002eff','#00b9ff','#002eff','#1d0093']}>
          <LinearGradient
            colors={theme == "Dark"?['#2a2a2a','#3d3d3d']:['#f6f6f6','#c2c2c2']} 
            style={[styles.card2,{height:item.item.data.shlok.length>175?"96.5%":"92.5%"}]}>
          <View style={styles.sub}>
            <Text style={[styles.subText,{color:theme=="Dark"?"white":"black"}]}>{item.item.data.verno}</Text>
            <Text style={[styles.subText,{color:theme=="Dark"?"white":"black",height:"100%"}]}>{item.item.data.shlok}</Text>
          </View>
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
    )}
  }
  if(theme!=null){
    return(
      <View style={{backgroundColor:theme=="Dark"?"black":"white",flex:1}}>
        <View style={{flex:1,marginTop:0.055*height}} >
          <FlatList
              data={main}
              style={{height:0.925*height}}
              renderItem={renderItem}
              ListFooterComponent={()=>{
                return(
                  <View style={{height:height*0.02}} ></View>
                )
              }}
              ListHeaderComponent={()=>{
                return(
                  <View style={{width:"100%",justifyContent:"center",alignItems:"center"}} >
                    <Text style={[styles.text,{fontWeight:"bold",fontFamily:"serif",marginBottom:0.025*height,alignSelf:"center",textAlign:"center",color:theme=="Dark"?"white":"black"}]} >Chapter {chpid1} : {chpogname}</Text>
                    <Image source={require("./Krishna.png")} style={{height:RFValue(255),width:RFValue(350),}} ></Image>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
              bounces={false}
              initialNumToRender={20}
              ItemSeparatorComponent={()=>{
                return(
                  <View style={{marginTop:RFValue(5)}} ></View>
                )
              }}
              />
        </View>
      </View>
    )
  }
}

export default class Verselist extends React.Component{

  render(){
    var chpid = this.props.route.params.chid
    var chpogname = this.props.route.params.chogname
    var theme = this.props.route.params.theme
    return(
      <Verselist1 data={{chpid,chpogname,theme}} />
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(20),
    fontFamily:"sans-serif-medium"
  },
  subText:{
    color:"white",
    fontSize:RFValue(13),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(8),
    textAlign :"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"auto",width:"100%",backgroundColor:"white"
  },
  card:{
    backgroundColor: "rgba(73, 73, 73 ,0.5)",
    width:"95%",
    justifyContent:"center",
    alignSelf:"center",
    marginBottom : RFValue(5),
    marginTop:RFValue(5),
    borderRadius:RFValue(15),
    height:"auto"
  },
  card1:{
    backgroundColor: "rgba(73, 73, 73,0.4)",
    width:"100%",
    flex:1,
    alignSelf:"center",
    borderRadius:RFValue(15),
    textAlign : "center",
    justifyContent:"center",
    display:"flex"
  },
  card2:{
    backgroundColor: "rgba(73, 73, 73,0.4)",
    width:"97%",
    alignSelf:"center",
    borderRadius:RFValue(15),
    textAlign : "center",
  },
  sub:{
    display:"flex",
    flexDirection:"column",
    width:"100%",
    marginTop:RFValue(10),
    marginBottom:RFValue(25)
  },
  main:{
    margin:RFValue(10),
    textAlign:"center",
    alignItems:"center",
    width:"95%"
  },
  mainHeader:{
    height:RFValue(65),
    backgroundColor:"#424242",
    alignItems:"center",
    flexDirection:"row",
    borderColor:"grey",
    borderTopColor:"grey",
    borderWidth:RFValue(1),
    width:width,
    justifyContent:"space-evenly"
  }
})