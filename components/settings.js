import React, { useEffect } from "react"
import { useState } from "react";
import { View,Text,Switch, Dimensions,Keyboard,ScrollView, TouchableOpacity,StyleSheet,Platform,StatusBar, TextInput } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { db } from "../firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
const{height,width}=Dimensions.get("window")

const Settings1=({changeTheme})=>{
    const[size,setSize]=useState(17)
    const[isEnabled,setIsEnabled] = useState(null)
    const[theme,setTheme]=useState('Light')
    const getTheme=async()=>{
        const value = await AsyncStorage.getItem('Theme')
        setTheme(value)
        setIsEnabled(value== "Dark" ? true : false)
    }


    useEffect(()=>{
        getTheme()
    })

    const toggleSwitch = () => {
        AsyncStorage.setItem('Theme',isEnabled === false ? "Dark":"Light")
        setIsEnabled(!isEnabled)
        changeTheme(!isEnabled==true?"Dark":"Light")
    };
    return(
      <ScrollView contentContainerStyle={{height:"100%"}} >
        <View style={{flex:1,alignItems:"center",backgroundColor:theme=="Dark"?"black":"white"}} >
            <Text style={{marginTop:RFValue(35),marginLeft:RFValue(25),textAlign:"center",color:theme=="Dark"?"white":"black",fontSize:RFValue(25),fontWeight:"bold",alignSelf:"flex-start"}} >
                Settings
            </Text>
            <LinearGradient 
                start={[0,0.5]}
                end={[1,0.5]}
                style={{height:RFValue(2),width:0.9*width,alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100)}} 
                colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#7B5506','#996D08','#DAB060','#996D08','#7B5506']} ></LinearGradient>
            <View style={{marginTop:RFValue(5),flexDirection:"column",width:"100%",alignContent:"center"}} >
                <Text style={{textAlign:"center",color:theme=="Dark"?"white":"black",fontSize:RFValue(18),fontWeight:"bold"}} >
                    Theme
                </Text>
                <View style={{width:"100%",flexDirection:"row",justifyContent:"space-evenly"}} >
                    <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(17),verticalAlign:"middle",fontWeight:"bold"}}>Light</Text>
                    <Switch
                        value={isEnabled}
                        onValueChange={toggleSwitch}
                        thumbColor={theme==="Dark"?"white":"black"}
                        trackColor={{false:"grey",true:"grey"}}
                        style={{borderColor:"white",borderWidth:RFValue(1)}}
                    />
                    <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(17),verticalAlign:"middle",fontWeight:"bold"}}>Dark</Text>
                </View>
            </View>
            <LinearGradient 
                start={[0,0.5]}
                end={[1,0.5]}
                style={{height:RFValue(2),width:0.9*width,alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100)}} 
                colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#7B5506','#996D08','#DAB060','#996D08','#7B5506']} ></LinearGradient>
            <View >
              <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(18),textAlign:"center",verticalAlign:"middle",fontWeight:"bold"}}>Font Size{"\n"}(will be applies while reading shlokas , mantras and stotram)</Text>              
              <View style={{marginTop:RFValue(10),flexDirection:'row',justifyContent:"space-evenly",alignItems:"center",height:0.08*height}} >
                <TouchableOpacity style={[styles.card,{marginBottom:0.025*height,width:0.1*width,height:0.1*width,borderRadius:RFValue(100),marginTop:0.025*height}]}
                  onPress={()=>{
                    var value = Math.round(100*size/17) > 80 ? size - 1.7 : size
                    setSize(value)
                  }}>
                  <LinearGradient
                    start={[0,0]}
                    end={[1,1]}
                    style={[styles.card1,{borderRadius:RFValue(100)}]}
                    colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#7B5506','#996D08','#DAB060','#996D08','#7B5506']}>
                    <LinearGradient
                      colors={theme==="Dark"?['#2a2a2a','#3d3d3d']:['#f6f6f6','#c2c2c2']} 
                      style={[styles.card2,{height:"85%",width:"85%",borderRadius:RFValue(100)}]}>
                      <View style={[styles.sub,{justifyContent:"center",alignItems:"center",color:theme == "Dark"?"white":"black"}]}>
                        <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(17),verticalAlign:"middle",fontWeight:"bold",textAlign:"center"}}>-</Text>
                      </View>
                   </LinearGradient>
                  </LinearGradient>
                </TouchableOpacity>
                <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(17),verticalAlign:"middle",fontWeight:"bold"}}>{Math.round(100*size/17)}%</Text>
                <TouchableOpacity style={[styles.card,{marginBottom:0.025*height,width:0.1*width,height:0.1*width,borderRadius:RFValue(100),marginTop:0.025*height}]}
                  onPress={()=>{
                    var value = Math.round(100*size/17) < 120 ? 1.7 + size : size
                    setSize(value)
                  }}>
                  <LinearGradient
                    start={[0,0]}
                    end={[1,1]}
                    style={[styles.card1,{borderRadius:RFValue(100)}]}
                    colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#7B5506','#996D08','#DAB060','#996D08','#7B5506']}>
                    <LinearGradient
                      colors={theme==="Dark"?['#2a2a2a','#3d3d3d']:['#f6f6f6','#c2c2c2']} 
                      style={[styles.card2,{height:"85%",width:"85%",borderRadius:RFValue(100)}]}>
                      <View style={[styles.sub,{justifyContent:"center",alignItems:"center",color:theme == "Dark"?"white":"black"}]}>
                        <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(17),verticalAlign:"middle",fontWeight:"bold",textAlign:"center"}}>+</Text>
                      </View>
                   </LinearGradient>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <LinearGradient 
                start={[0,0.5]}
                end={[1,0.5]}
                style={{height:RFValue(2),width:0.9*width,alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100)}} 
                colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#7B5506','#996D08','#DAB060','#996D08','#7B5506']} ></LinearGradient>      
            <View style={{alignItems:"center"}} >
              <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(18),verticalAlign:"middle",fontWeight:"bold",textAlign:"center"}}>Report bugs , typos and suggest more mantras and stotrams</Text>
              <TextInput cursorColor={theme==="Dark"?"white":"black"} placeholder="Enter your queries/suggestions" placeholderTextColor={theme==="Dark"?"#bbbbbb":"#464646"} multiline={true} style={{verticalAlign:"top",backgroundColor:theme==="Dark"?"black":"white",borderColor:theme==="Dark"?"white":"black",color:theme==="Dark"?"white":"black",borderWidth:RFValue(2),marginTop:0.025*height,padding:(10),paddingTop:RFValue(5),paddingBottom:RFValue(5),height:0.1*height,borderRadius:RFValue(15),width:0.9*width}} />
              <TouchableOpacity style={[styles.card,{marginTop:0.025*height}]}
                onPress={()=>{
                  navigate("Hverse",{cid:info.id ,chpid : info.chp , chpname : info.name,theme:theme})
                }}>
                <LinearGradient
                    start={[0,0]}
                    end={[1,1]}
                    style={styles.card1}
                    colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#7B5506','#996D08','#DAB060','#996D08','#7B5506']}>
                  <LinearGradient
                    colors={theme==="Dark"?['#2a2a2a','#3d3d3d']:['#f6f6f6','#c2c2c2']} 
                    style={[styles.card2]}>
                      <View style={[styles.sub,{justifyContent:"center"}]} >
                        <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(18),verticalAlign:"middle",fontWeight:"bold",textAlign:"center"}}>Submit</Text>
                      </View>
                  </LinearGradient>
                </LinearGradient>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    )
}

export default class Settings extends React.Component{
    render(){
        const {navigation} = this.props
        return(
            <Settings1 changeTheme = {(value)=>{this.props.changeTheme(value)}} />
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
    width:0.35*width,
    height:0.075*height,
    borderRadius:RFValue(15),
    marginRight:RFValue(10),
    marginLeft:RFValue(10),
    justifyContent:"center",
    alignItems:"center"
  },
  card1:{
    backgroundColor: "rgba(73, 73, 73,0.4)",
    width:"100%",
    height:"100%",
    alignSelf:"center",
    borderRadius:RFValue(15),
    textAlign : "center",
    justifyContent:"center",
    alignItems:'center'
  },
  card2:{
    backgroundColor: "rgba(73, 73, 73,0.4)",
    width:"94.5%",
    height:"90.5%",
    alignSelf:"center",
    borderRadius:RFValue(15),
    textAlign : "center",
    alignItems:'center',
    justifyContent:"center"
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