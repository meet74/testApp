import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Platform,
  Image,
  ImageBackground,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Colors } from "../../constant/Colors";
import { Entypo } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { dummyCities, headerTiles } from "../../constant/DummyData";
import {doc,getDoc} from 'firebase/firestore'
import GridCard from "../../components/GridCard";
import Card from "../../components/Card";
import {firestore} from '../../config/firebase'
import { useDispatch, useSelector } from "react-redux";
import { storeEventData } from "../../store/action/EventAction";
import { set_book } from "../../store/action/bookingAction";

const { width, height } = Dimensions.get("screen");

const HomeScreen = (props) => {
  const refRBSheet = useRef();

  const [cityName, setcityName] = useState(dummyCities[0].name);
  const [data, setData] = useState([])
  const userData = useSelector(state=>state.user)
  const bookingsData = useSelector(state=>state.book)

  const [recommendationArr, setrecommendationArr] = useState([])
  const [cityFilteredData, setcityFilteredData] = useState([])
  const dispatch = useDispatch();
 
 
  const fetchBookingData = async() =>{
     // Reference the document
     const docRef = doc(firestore, "bookings", "bookingArr");
    
     // Retrieve the document
     const docSnap = await getDoc(docRef);
 
     if (docSnap.exists()) {

       const bookArr = docSnap.data().bookings

      if(bookArr.length){
        
      const tempBooksArr = bookArr.filter(data=>data.userId === userData.user.id)
       dispatch(set_book(tempBooksArr))
      }else{
        dispatch(set_book())
      }
     }
  }

  useEffect(() => {
    fetchBookingData()
  }, [])
  

  const cityFilteredDataFun = (eventData = []) => {
    return eventData.filter(eve=>eve.city === cityName);
  }
  function shuffle(arrParam){
    let arr = arrParam.slice(),
        length = arr.length,
        temp,
        i;

    while(length){
        i = Math.floor(Math.random() * length--);

        temp = arr[length];
        arr[length] = arr[i];
        arr[i] = temp;
    }

    return arr;
}

useEffect(() => {
  setcityFilteredData(cityFilteredDataFun(data))
  setrecommendationArr(shuffle(cityFilteredDataFun(data)))
}, [cityName])


  const fetchDataFromDocument = async () => {
    const documentId = "Pd7qonxYNmzUwpnNmkOW"
    try {
       const docRef = doc(firestore, "Events", documentId);
       const docSnap = await getDoc(docRef);
   
       if (docSnap.exists()) {
       
         setData(docSnap.data().events);
         const tempArr = shuffle(cityFilteredDataFun(docSnap.data().events))
         setrecommendationArr(tempArr);

         dispatch(storeEventData(docSnap.data().events));

         setcityFilteredData(cityFilteredDataFun(docSnap.data().events))
       } else {
         console.log("No such document!");
       }
    } catch (e) {
       console.error("Error getting document:", e);
    }
   };

   useEffect(() => {
     
   fetchDataFromDocument()
     
   }, [])
   



  const btsCityHandler = (city) => {
    refRBSheet.current.close();
    setcityName(city);
  };
  return (
    <View style={styles.safeareaview}>
      <ScrollView showsVerticalScrollIndicator = {false}>
        <View style={styles.topBarContainer}>
          <SafeAreaView />
          <View
            style={{
              ...styles.locationContainer,
              marginTop: Platform.OS === "ios" ? 0 : 50,
            }}
          >
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={styles.curentLocationContainer}
            >
              <Text style={styles.currentlocationtxt}>Current Location</Text>
              <Entypo
                name="chevron-small-down"
                size={24}
                color={Colors.borderColor}
              />
            </TouchableOpacity>
            <Text style={styles.citytxt}>{cityName}</Text>
          </View>
        </View>
        {/* <ScrollView key={Math.random()} horizontal showsHorizontalScrollIndicator={false}>
          {headerTiles.map((data,index) => {
            return (
              <View
                key={index}
                style={{
                  ...styles.headerContainer,
                  backgroundColor: data.bgColor,
                }}
              >
                {data.icon}
                <Text style={styles.headerText}>{data.name}</Text>
              </View>
            );
          })}
        </ScrollView> */}

        <View>
          <Text style={styles.upcomingText}>Upcoming Events</Text>

          <ScrollView key={Math.random()} horizontal showsHorizontalScrollIndicator={false}>
            {recommendationArr.map((item,index) => {
              return (
                <GridCard key={index} item={item} props = {props}/>
              );
            })}
          </ScrollView>

          <View style = {styles.inviteCardContainer}>
            <View>
            <Text style = {styles.inviteFriendsText}>Invite your friends</Text>
            <Text style = {styles.inviteTicketText}>Get £20 off on ticket</Text>
            </View>
            <Image source={require("../../../assets/images/inviteCard.png")} style = {styles.inviteCardImage}/>
          </View>

          <View>
          <Text style={styles.upcomingText}>Nearby You</Text>
            <ScrollView key={Math.random()} showsVerticalScrollIndicator = {false}>
              {cityFilteredData.map((item,index) => {
                return  <Card key={index} event = {item} props = {props}/>
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={height * 0.85}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={bottomSheetStyle.btsContainer}>
          <Text style={bottomSheetStyle.btsLocationText}>Select your City</Text>
          

          <View style={bottomSheetStyle.btsListContainer}>
            <FlatList
              data={dummyCities}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => btsCityHandler(item.name)}
                  >
                    <View style={bottomSheetStyle.btscityContainer}>
                      <MaterialCommunityIcons
                        name="city-variant-outline"
                        size={50}
                        color={Colors.primaryColor}
                        style={bottomSheetStyle.btsCityIcon}
                      />
                      <Text style={bottomSheetStyle.btsCityTxt}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  topBarContainer: {
    backgroundColor: Colors.primaryColor,
    height: 125,
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  currentlocationtxt: {
    color: Colors.borderColor,
  },
  citytxt: {
    color: "white",

    alignSelf: "center",
  },
  curentLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    margin: 5,
    marginTop: 15,
  },
  headerText: {
    color: "white",
    marginHorizontal: 10,
  },
  upcomingText: {
    margin: 10,
    letterSpacing: 0.5,
    fontSize: 20,
    marginTop: 20,
    color: Colors.primaryColor,
  },
  inviteCardImage:{
    height:100,
    width:100,
    margin:10,
    resizeMode:"cover"
  },
  inviteCardContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
    backgroundColor:"rgba(0, 248, 255,0.4)",
    margin:15,
    borderRadius:15
  },
  inviteFriendsText:{
    fontSize:20
  },
  inviteTicketText:{
    fontWeight:"300",
    marginVertical:10
  },
  
});

const bottomSheetStyle = StyleSheet.create({
  btsContainer: {
    margin: 10,
  },
  btsinputDecoration: {
    borderWidth: 1,
    margin: 10,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
    width: width * 0.9,
    alignSelf: "center",
  },
  btsinputText: {
    padding: 10,
  },
  btscityContainer: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
  },
  btsCityTxt: {
    paddingVertical: 10,
    fontSize: 18,
    color: Colors.primaryColor,
  },
  btsCityIcon: {
    paddingVertical: 15,
  },
  btsListContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btsLocationText: {
    fontFamily: "Actor-Regular",
    fontSize: 24,
    color: Colors.primaryColor,
    letterSpacing: 0.5,
    margin: 5,
    marginLeft: 10,
  },
});
export default HomeScreen;
