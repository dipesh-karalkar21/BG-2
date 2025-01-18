import * as React from "react";
import {
  View , 
  Text , 
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import {useCallback, useRef } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import chplist from "../chplist.json";
import {RFValue} from "react-native-responsive-fontsize";
const {width,height} = Dimensions.get('window')
var value = []
const Hverse1=(data)=>{ 
  var chpid = parseInt(data.data1)
  var cid1 = data.data
  var theme = data.data2.theme
  const[chps,setChps] = useState(chplist[0][chpid])
  const[cid,setCid] = useState(cid1)
  const[rerender, setRerender] = useState(true)
  const[refreshing,setRefreshing] = useState(false); 
  const[zIndex,setZindex]=useState(0);
  var flatListRef = React.useRef<FlatList>(null);   
  const getBookMark =async()=>{
    const val = AsyncStorage.getItem('Recent')
    value = JSON.parse(val)
  }
  useEffect(()=>{
    flatListRef.scrollToIndex({index : cid})
    getBookMark()
  },[cid])


  const renderItem =useCallback((item)=>{
    var bookmark = "bookmark-outline"
    for(var i in value){
      if(value[i].id == item.item.id && value[i].chp == item.item.chp){
        bookmark = "bookmark"
      }
    }
    
    if(item.item.id > 0){return(
      <View style={[styles.card]}>
      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
      <Text> </Text>
      <TouchableOpacity 
        onPress={()=>{
          var status = "added"
          for(i in value){
            if(value[i].id == item.item.id && value[i].chp == item.item.chp){
              value.splice(i,1)
              status = "removed"
            }
          }   

          if(status === "added"){
            value.push(item.item)
          }
          
          for(var j = 0;j<(value.length - 1);j++){
            for(var k = 0;k<(value.length - j - 1);k++){
              if(parseInt(value[k].chp) > parseInt(value[k+1].chp)){
                var temp = value[k]
                value[k] = value[k+1]
                value[k+1] = temp
              }
              else if(parseInt(value[k].chp) == parseInt(value[k+1].chp)){
                if(parseInt(value[k].id) > parseInt(value[k+1].id)){
                  var temp = value[k]
                  value[k] = value[k+1]
                  value[k+1] = temp
                }
              }
            }
          }
          AsyncStorage.setItem('BookMark',JSON.stringify(value))
          setRerender(!rerender)  
        }}
        style={{alignSelf:"flex-end",marginTop:RFValue(40),position:"absolute",zIndex:1}} >
        <Ionicons name = {bookmark} style={[styles.subText1,{color:theme=="Dark"?"white":"black"}]} ></Ionicons>
      </TouchableOpacity>
      <Text style={[styles.subText,{fontSize:RFValue(17.5),color:theme=="Dark"?"white":"black",marginTop:RFValue(30)}]}>
        Chapter {item.item.chp} Verse {item.item.data.verno}
      </Text>
      <LinearGradient 
              start={[0,0.5]}
              end={[1,0.5]}
              style={{height:RFValue(4),width:RFValue(200),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100)}} 
              colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#1d0093','#002eff','#00b9ff','#002eff','#1d0093']} ></LinearGradient>
      <Text style={[styles.subText,{color:theme=="Dark"?"white":"black"}]}>{item.item.data.shlok+"\n"}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17),color:theme=="Dark"?"white":"black"}]}>
        Transliteration
      </Text>
      <LinearGradient 
              start={[0,0.5]}
              end={[1,0.5]}
              style={{height:RFValue(4),width:RFValue(150),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100)}} 
              colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#1d0093','#002eff','#00b9ff','#002eff','#1d0093']} ></LinearGradient>
      <Text style={[styles.subText,{color:theme=="Dark"?"white":"black"}]}>{item.item.data.translit}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17),color:theme=="Dark"?"white":"black"}]}>
        Translation
      </Text>
      <LinearGradient 
              start={[0,0.5]}
              end={[1,0.5]}
              style={{height:RFValue(4),width:RFValue(150),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100)}} 
              colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#1d0093','#002eff','#00b9ff','#002eff','#1d0093']} ></LinearGradient>
      <Text style={[styles.subText,{color:theme=="Dark"?"white":"black"}]}>{item.item.data.translate}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17),color:theme=="Dark"?"white":"black"}]}>
        Purport
      </Text>
      <LinearGradient 
              start={[0,0.5]}
              end={[1,0.5]}
              style={{height:RFValue(4),width:RFValue(100),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100)}} 
              colors={theme==="Dark"?['#E6BE8A','#FFCC00','white','#FFCC00','#E6BE8A']:['#1d0093','#002eff','#00b9ff','#002eff','#1d0093']} ></LinearGradient>
      <Text style={[styles.subText,{color:theme=="Dark"?"white":"black"}]}>{item.item.data.purport}</Text>
      <Text> </Text>
      <Text> </Text>
      </ScrollView>
      </View>
    );}
    else{
      return(
        <View style={{height:height,width:width,justifyContent:"center",alignItems:"center"}}>
          <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"white":"black"}]}>Chapter {item.item.chp}</Text>
          <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"white":"black"}]}> {item.item.name} </Text>
          <TouchableOpacity onPress={loadMorePrevious} style={{display : item.item.chp == 1 ? "none" : "flex"}} >
            <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"white":"black"}]}>Previous Chapter </Text>
          </TouchableOpacity>
        </View>
      )  
    }
  },[rerender])

  const ListFooterComponent =useCallback(()=>{
    return(
      <View style={{height:height,width:width,justifyContent:"center",alignItems:"center"}}>
        <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"white":"black"}]}>Thus Ends Bhagavad Gita</Text>
        <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"white":"black"}]}>Chapter {chpid}</Text>
        <Text> </Text>
        <TouchableOpacity onPress={loadMore} style={{display : chpid == 18 ? "none" : "flex"}} >
          <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"white":"black"}]}>Next Chapter </Text>
        </TouchableOpacity>
      </View>
    )
  },[chpid])

  const loadMore =useCallback(()=>{
    setZindex(2)
    setRefreshing(true)
    setTimeout(()=>{
      setChps(chplist[0][`${parseInt(chpid)+1}`])
      chpid += 1
      setCid(1)
      setCid(0)
      setRefreshing(false)
      setZindex(0)
    },0)
  },[])
  
  const loadMorePrevious = useCallback(()=>{
    setZindex(2)
    setRefreshing(true)
    setTimeout(()=>{
      setChps(chplist[0][`${parseInt(chpid)-1}`])
      chpid -= 1
      setCid((chplist[0][`${chpid}`]).length-1)
      setRefreshing(false)
      setZindex(0)
    },0)
  },[])

  const [spinValue, setSpinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spinDeg = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });


  return(
    <View style={{backgroundColor:"black",flex:1}} >
    <View style={{height:height,display:"flex",width:width,position:"absolute",zIndex:zIndex}}>
        <View style={{position:"absolute",fontWeight:"bold",width:width,height:height}}>
          <Text style={{fontSize:RFValue(25),color:"white",margin:RFValue(10),textAlign:"right",}}>
            Loading...  
          </Text></View>
    </View>
    <FlatList
      ref={ref =>(flatListRef = ref)}
      data={chps}
      renderItem={renderItem}
      style={{zIndex:1,backgroundColor:theme=="Dark"?"black":"white"}}
      horizontal={true}
      ListFooterComponent={ListFooterComponent}
      showsHorizontalScrollIndicator={false}
      keyExtractor={useCallback(item=>(item.id))}
      pagingEnabled
      initialNumToRender={20}
      maxToRenderPerBatch={80}
      updateCellsBatchingPeriod={3}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          if(viewableItems[0].item.id !=0){
            const currentVerse = viewableItems[0].item;
            AsyncStorage.setItem('Recent',JSON.stringify(currentVerse)).then(()=>{console.log(currentVerse.id)})
          }
        }
      }}
      viewabilityConfig={{itemVisiblePercentThreshold:95,}}
      bounces={false}
      refreshing={refreshing}
      getItemLayout={(data,index)=>({length : width , offset:width*index , index})}
        />
    </View>
  )
}

export default class Hverse extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      info : null
    };
  }

  async componentDidMount(){
    const value = await AsyncStorage.getItem('BookMark')
    if (value) {
        const data = JSON.parse(value);
        this.setState({info : data});
    }
    else{
      this.setState({info : []});
    }
  }

  render(){
    value = this.state.info
    const theme = this.props.route.params.theme
    const cid1 = this.props.route.params.cid
    const chpid1 = this.props.route.params.chpid
    const chpname1 = this.props.route.params.chpname
    return(
      <Hverse1 data={cid1} data1={chpid1} data2={{chpname1,theme}}  />
    )
  }
}

const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(25),
    fontFamily:"sans-serif-medium"
  },
  subText1:{
    color:"black",
    fontSize:RFValue(30),
    fontWeight:"Bold",
    textAlign :"right",
    marginRight:RFValue(10),
    alignSelf:"flex-end"
  },
  subText:{
    color:"white",
    fontSize:RFValue(17),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(10),
    textAlign :"center",
    textShadowColor:"white",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"100%",width:width,backgroundColor: "white"
  },
  card:{
    width:width,
    justifyContent:"center",
    alignItems:"center",
    flex:1
  },
  main:{
    width:"100%",
  },
  main2:{
    width:"100%",
  },
  hr:{
    width : RFValue(120),
    height:RFValue(5),
    backgroundColor:"#ff7722",
    borderRadius:RFValue(50),
    alignSelf:"center"
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
  },
})