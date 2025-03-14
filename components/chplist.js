import * as React from "react";
import {
  View , 
  Text , 
  Image,
  FlatList,
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  } from "react-native";
import Chp from "../chplist.json"
import CHPDATA from "../chp.json";
import { LinearGradient } from "expo-linear-gradient";
import {RFValue,RFPercentage} from "react-native-responsive-fontsize";
import { useEffect,useState,useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const {width,height} = Dimensions.get('window')

const Chplist1=({changeTabBar})=>{
  const { navigate } = useNavigation();
  const image={
    "1":require("./Chapter 1.jpg"),
    "2":require("./Chapter 2.jpg"),
    "3":require("./Chapter 3.jpg"),
    "4":require("./Chapter 4.jpg"),
    "5":require("./Chapter 5.jpg"),
    "6":require("./Chapter 6.jpg"),
    "7":require("./Chapter 7.jpg"),
    "8":require("./Chapter 8.jpg"),
    "9":require("./Chapter 9.jpg"),
    "10":require("./Chapter 10.jpg"),
    "11":require("./Chapter 11.jpeg"),
    "12":require("./Chapter 12.jpeg"),
    "13":require("./Chapter 13.jpeg"),
    "14":require("./Chapter 14.jpg"),
    "15":require("./Chapter 15.jpg"),
    "16":require("./Chapter 16.jpg"),
    "17":require("./Chapter 17.jpg"),
    "18":require("./Chapter 18.jpg"),
  }
  const[info,setInfo]=useState(null)
  const[theme,setTheme]=useState(null)

  fetch=async()=>{
    const bg = await AsyncStorage.getItem('Theme')
    setTheme(bg)
    const value = await AsyncStorage.getItem('Recent')
    const data = JSON.parse(value)
    setInfo(data)
  }

  useFocusEffect( 
    React.useCallback(() => { 
      console.log('Screen is focused.');
      fetch()
    return(()=>{setInfo(null)})
    }, []));


  const renderItem =(item)=>{
    var id = item.item.id < 10 ? "0"+item.item.id : item.item.id
    return(
    <TouchableOpacity style={styles.listCard} 
      onPress={()=>{navigate("Verse",
        {
          chid : item.item.id,
          chname:item.item.name,
          chogname:item.item.ogname,
          theme:theme
        })}}>
      <LinearGradient 
        start={[0,0]}
        end={[1,1]}
        style={styles.listCard1} 
        colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#816317','#9F8000','#D4AF37','#EECC40','#D4AF37','#9F8000','#816317']} >
        <LinearGradient colors={theme==="Dark"?['#2a2a2a','#3d3d3d']:['#f6f6f6','#c2c2c2']} style={styles.listCard2} >
        <Image source={image[item.item.id]} style={{position:"absolute",height:"100%",width:"100%",borderRadius:RFValue(15)}} resizeMode="stretch" blurRadius={10} />
          <View style={[styles.listSub,{backgroundColor:theme=="Dark"?"rgba(0, 0, 0 , 0.4)":"rgba(225,225,225,0.6)",borderRadius:RFValue(15),borderColor:"white",borderWidth:0.2}]}>
            <Image source={image[item.item.id]} style={{height:"100%",width:"47.5%",borderRadius:RFValue(15)}} resizeMode="stretch" />
            <View style={[styles.innerView,{borderRadius:RFValue(15),marginTop:RFValue(10)}]}>
              <Text style={[styles.subText,{color:theme == "Dark"?"white":"black"}]}>{id}. {item.item["name-trans"]}</Text>
              <Text style={[styles.subText,{color:theme == "Dark"?"white":"black"}]}>{item.item.ogname}</Text>
              <Text style={[styles.subText,{color:theme == "Dark"?"white":"black"}]}>({item.item.name})</Text>
              <Text style={[styles.subText,{marginTop:RFValue(10),color:theme == "Dark"?"white":"black"}]}>{item.item.desc}</Text>
            </View>
          </View>
      </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
    )
  }

  if(info!=null){
    return(
      <ScrollView style={{backgroundColor:theme == "Dark"?"black":"white",flex:1}} showsVerticalScrollIndicator={false} >
        <View style={{backgroundColor:theme == "Dark"?"black":"white",flex:1}} >
          <View>
            <View style={{marginTop:0.05*height}} >
              <Text style={[styles.text,{fontWeight:"bold",marginBottom:0.025*height,color:theme == "Dark"?"white":"black"}]} >Last Read Verse : </Text>
              <TouchableOpacity style={[styles.card,{marginBottom:0.025*height}]}
              onPress={()=>{
                navigate("Hverse",{cid:info.id ,chpid : info.chp , chpname : info.name,theme:theme})
              }}>
                <LinearGradient
                  start={[0,0]}
                  end={[1,1]}
                  style={styles.card1}
                  colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#7B5506','#996D08','#DAB060','#996D08','#7B5506']}
                >
                  <LinearGradient
                    colors={theme==="Dark"?['#2a2a2a','#3d3d3d']:['#f6f6f6','#c2c2c2']} 
                    style={[styles.card2,{height:info.data.shlok.length>175?"95.5%":"90.5%"}]}
                  >
                    <View style={[styles.sub,{justifyContent:"center",alignItems:"center",color:theme == "Dark"?"white":"black"}]}>
                      <Text style={[styles.subText1,{textAlign:"center",color:theme == "Dark"?"white":"black",fontSize:RFPercentage(2)}]} >Chapter {info.chp} Verse {info.data.verno}</Text>
                      <Text style={[styles.subText1,{textAlign:"center",color:theme == "Dark"?"white":"black",height:"100%",fontSize:RFPercentage(1.95)}]} >{info.data.shlok+"\n".repeat(info.data.shlok.length>175?0:1)}{console.log(info.data.shlok.length)}</Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
              <Text style={[styles.text,{fontWeight:"bold",fontFamily:"Roboto",color:theme == "Dark"?"white":"black"}]} >Chapters </Text>
            </View>
            <FlatList
                data={CHPDATA}
                style={{alignSelf:"center",marginTop:0.025*height}}
                renderItem={renderItem}
                horizontal={true}
                pagingEnabled={true}
                keyExtractor={item => item.id}
                bounces={false}
                showsHorizontalScrollIndicator = {false} />
          </View>
        </View>
      </ScrollView>
    )
  }
  else{
    return(
      <View style={{flex:1,backgroundColor:theme=="Dark"?"black":"white"}} >
          <ActivityIndicator size={100} style={{backgroundColor:"transparent",height:"100%",width:"100%"}} ></ActivityIndicator>
      </View>
    )
  }
}


export default class Chplist extends React.Component{

  async componentDidMount(){
    await AsyncStorage.getItem('Recent').then((value)=>{
      var data = JSON.parse(value)
      if(data == null){
        AsyncStorage.setItem('Recent',JSON.stringify(Chp[0]['1'][1]))
      }
    })
    await AsyncStorage.getItem('Theme').then((value)=>{
      if(value == null){
        AsyncStorage.setItem('Theme',"Light")
      }
    })
  }

  render(){
    return(
      <View style={{backgroundColor:"transparent",flex:1}} >
        <Chplist1 changeTabBar={()=>{
          AsyncStorage.getItem('Theme').then((value)=>{
            this.props.navigation.setParams({theme:value})
          })
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(25),
    marginLeft:RFValue(10),
  },
  subText:{
    color:"white",
    fontSize:RFValue(13),
    fontWeight:"bold",
    marginTop:RFValue(0),
    marginLeft:RFValue(10),
    marginRight:RFValue(5),
    textAlign :"left",
  },
  subText1:{
    color:"white",
    fontWeight:"bold",
    fontSize:RFValue(13),
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"auto",width:"100%",backgroundColor:"white"
  },
  card:{
    backgroundColor: "rgba(73, 73, 73,0.5)",
    width:"95%",
    height:"auto",
    justifyContent:"center",
    alignSelf:"center",
    borderRadius:RFValue(15),
    marginRight:RFValue(10),
    marginLeft:RFValue(10)
  },
  card1:{
    backgroundColor: "rgba(73, 73, 73,0.4)",
    width:"100%",
    flex:1,
    alignSelf:"center",
    borderRadius:RFValue(15),
    textAlign : "center",
    justifyContent:"center",
  },
  card2:{
    backgroundColor: "rgba(73, 73, 73,0.4)",
    width:"96.5%",
    alignSelf:"center",
    borderRadius:RFValue(15),
    textAlign : "center",
  },
  listCard:{
    backgroundColor: "rgba(73, 73, 73,0.5)",
    width:0.95*width,
    height:0.5*height,
    justifyContent:"center",
    alignSelf:"center",
    borderRadius:RFValue(15),
    marginRight:0.025*width,
    marginLeft:0.025*width
  },
  listCard1:{
    backgroundColor: "rgba(73, 73, 73,0.4)",
    width:"100%",
    height:"100%",
    alignSelf:"center",
    borderRadius:RFValue(15),
    textAlign : "center",
    display:"flex",
    justifyContent:'center',
    alignItems:"center"
  },
  listCard2:{
    width:"96.5%",
    height:"96.5%",
    borderRadius:RFValue(15),
    textAlign : "center",
  },
  sub:{
    display:"flex",
    flexDirection:"column",
    width:"100%",
    height:"100%",
    marginTop:RFValue(20),
    marginBottom:RFValue(10)
  },
  listSub:{
    display:"flex",
    flexDirection:"row",
    width:"100%",
    marginBottom:RFValue(15),
    height:"100%"
  },
  main:{
    verticalAlign:"top",
    textAlignVertical:"top",
    height:"100%",
    width:"95%"
  },
  innerView:{
    marginRight:RFValue(5),
    width:"52.5%",
  },
  mainHeader:{
    height:RFValue(75),
    backgroundColor:"#424242",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    borderColor:"grey",
    borderTopColor:"grey",
    borderWidth:RFValue(1),
  },

})