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
  Dimensions
  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {RFValue,RFPercentage} from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
const {width,height} = Dimensions.get('window')

const BookMark1=({changeTabBar})=>{
  const { navigate } = useNavigation();
  
  const[theme,setTheme]=useState(null)
  const[data,setData] = useState(null);

  useFocusEffect(
    React.useCallback(() => { 
      console.log('Screen is focused');
      getData(); 
      
      return () => { }; 
  }, []));

  async function getData(){
    setData(JSON.parse(await AsyncStorage.getItem('BookMark')))
    const value=await AsyncStorage.getItem('Theme')
    setTheme(value)
  }
  useEffect(()=>{
    getData()
  },[])
  
  const renderItem =(item)=>{
    return(
      <TouchableOpacity style={styles.card} 
      onPress={()=>{navigate("Hverse",{cid:item.item.id ,chpid : item.item.chp , chpname : item.item.name})}}>
        <LinearGradient
          start={[0,0]}
          end={[1,1]}
          style={styles.card1}
          colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#7B5506','#996D08','#DAB060','#996D08','#7B5506']}>
          <LinearGradient
            colors={theme==="Dark"?['#2a2a2a','#3d3d3d']:['#f6f6f6','#c2c2c2']} 
            style={[styles.card2,{height:item.item.data.shlok.length>175?"95.5%":"90.5%"}]}>
          <View style={styles.sub}>
            <Text style={[styles.subText,{color:theme=="Dark"?"white":'black',fontSize:RFPercentage(1.95)}]}>Chapter {item.item.chp} Verse {item.item.data.verno}</Text>
            <Text style={[styles.subText,{color:theme=="Dark"?"white":'black',fontSize:RFPercentage(1.95)}]}>{item.item.data.shlok}</Text>
          </View>
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  if(data!=null && data.length != 0){
    return(
      <View style={{backgroundColor:theme=="Dark"?"black":"white",flex:1}}>
        <FlatList
            data={data}
            style={{height:"auto",width:"100%"}}
            renderItem={renderItem}
            ListHeaderComponent={()=>{
              return(
                <View style={{marginTop:0.05*height}} >
                  <Text style={[styles.text,{fontWeight:"bold",marginBottom:0.01*height,color:theme==="Dark"?"white":"black"}]} >Bookmarks </Text>
                </View>
              )
            }}
            ListFooterComponent={()=>{
              return(
                <View style={{height:0.01*height}} ></View>
              )
            }}
            keyExtractor={item => `${item.chp}.${item.id}`}
            bounces={false}
            initialNumToRender={20}
            />
      </View>
    )
  }
  else{
    return(
      <View style={{flex:1,backgroundColor:theme==="Dark"?"black":"white"}} >
        <View style={{marginTop:0.05*height,backgroundColor:theme==="Dark"?"black":"white",flex:1}} >
          <Text style={[styles.text,{fontWeight:"bold",marginBottom:0.01*height,color:theme==="Dark"?"white":"black"}]} >Bookmarks </Text>
          <Text style={[styles.text,{fontSize:RFValue(15),fontWeight:"bold",marginBottom:0.01*height,marginLeft:RFValue(0),color:theme==="Dark"?"white":"black",textAlign:"center",width:"100%"}]} >You don't have any bookmarks yet</Text>
        </View>
      </View>
    )
  }

}

export default class BookMark extends React.Component{  
  render(){
    return(
      <BookMark1 changeTabBar={(Theme)=>{this.props.navigation.setParams({theme:Theme})}} />
    )
  }
}


const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(25),
    fontFamily:"sans-serif-medium",
    marginLeft:RFValue(10)
  },
  subText:{
    color:"white",
    fontSize:RFValue(14),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(8),
    textAlign :"center"
  },
  subText1:{
    color:"#E2E2E2",
    fontSize:RFValue(14),
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
    width:"96.5%",
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
    width:"95%",
  },
  main1:{
    textAlign:"center",
    alignItems:"center",
    width:"100%",
    height : "100%",
    backgroundColor: "rgba(73, 73, 73 ,0.4)",

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