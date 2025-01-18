import React, { useEffect } from "react"
import { useState } from "react";
import { View,Text,Switch, Dimensions, TouchableOpacity } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import Slider from '@react-native-community/slider';
const{height,width}=Dimensions.get("window")

const Settings1=({changeTheme})=>{
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
        <View style={{flex:1,alignItems:"center",backgroundColor:theme=="Dark"?"black":"white"}} >
            <Text style={{marginTop:RFValue(35),marginLeft:RFValue(25),textAlign:"center",color:theme=="Dark"?"white":"black",fontSize:RFValue(25),fontWeight:"bold",alignSelf:"flex-start"}} >
                Settings
            </Text>
            <LinearGradient 
                start={[0,0.5]}
                end={[1,0.5]}
                style={{height:RFValue(2),width:0.9*width,alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100)}} 
                colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#1d0093','#002eff','#00b9ff','#002eff','#1d0093']} ></LinearGradient>
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
                colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#1d0093','#002eff','#00b9ff','#002eff','#1d0093']} ></LinearGradient>
            <View>
                <TouchableOpacity>
                    <Text style={{marginTop:RFValue(5),textAlign:"center",color:theme=="Dark"?"white":"black",fontSize:RFValue(18),fontWeight:"bold"}} >
                        Font Size{"\n"}(will be applied while reading verses/mantras)
                    </Text>
                    <View style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                        <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(17),verticalAlign:"middle",fontWeight:"bold"}}>Min</Text>
                        <Slider
                            style={{width: 0.55*width, height: 40}}
                            minimumValue={0}
                            maximumValue={100}
                            value={50}
                            minimumTrackTintColor="grey"
                            maximumTrackTintColor="grey"
                        />
                        <Text style={{color:theme=="Dark"?"white":"black",fontSize:RFValue(17),verticalAlign:"middle",fontWeight:"bold"}}>Max</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>

            </View>
        </View>
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

