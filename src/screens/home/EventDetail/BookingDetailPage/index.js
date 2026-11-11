import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Colors } from "../../../../constant/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ScreenNames } from "../../../../constant/ScreenNames";
import { useDispatch, useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";

import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../config/firebase";
import { add_book, remove_book, update_book } from "../../../../store/action/bookingAction";
import { add_notification } from "../../../../store/action/userAction";

const { width, height } = Dimensions.get("screen");

const BookingDetailPage = (props) => {
  const { item } = props.route.params;
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setloading] = useState(false)
  const refRBSheet = useRef();
  const userData = useSelector((state) => state.user);
  const bookingData = useSelector((state) => state.book);
  const [newQuantity, setnewQuantity] = useState(0)
  console.log(userData);
  const dispatch = useDispatch();
  const checkIfItsBooked = () => {
    return bookingData.books.find((data) => data.bookingId === item.eventInfo.bookingId);
  };
  const notificationFun = (title, type) => { return {
    message:`Your ticket for ${title} is ${type}`
  }}

  const updateData = async() => {
    const bookingArrRef = doc(firestore, "bookings", "bookingArr");
    const bookingArrSnap = await getDoc(bookingArrRef);

  
    if (bookingArrSnap.exists()) {
      // Update the userArr document's bookings array with the new booking
      const bookingDataArr = bookingArrSnap.data().bookings
      //console.log(userData.user.id);
     
      //console.log("d"+particularBooking);
      const tempBookingData = [...bookingDataArr]
     
      
     const newBookingData = tempBookingData.filter(data=>data.bookingId!==item.bookingId)
      //dispatch(add_notification(notificationFun(item.eventInfo.eventName,"Cancelled")))
      const bookingObj = {
        bookingId:(tempBookingData.length+2).toString(),
        eventInfo: item.eventInfo,
        quantity,
        userId: userData.user.id,
      };
      
      newBookingData.push(bookingObj)
      console.log("i",newBookingData);
      dispatch(update_book(newBookingData))
      const notiObj = {
        id:Math.random()*Math.random(),
        message:notificationFun(item.eventInfo.eventName,"Updated")
      }
      dispatch(add_notification(notiObj))
      await addNotification(notiObj)

      try {
          await updateDoc(bookingArrRef, {
              bookings: newBookingData
          });
      } catch (error) {
          console.log(error);
      }
      console.log("Bookings Cancelled successfully.");
  } else {
      console.log("bookArr document does not exist.");
  }

  }

  const removeData = async() => {
    const bookingArrRef = doc(firestore, "bookings", "bookingArr");
    const bookingArrSnap = await getDoc(bookingArrRef);

  
    if (bookingArrSnap.exists()) {
      // Update the userArr document's bookings array with the new booking
      const bookingDataArr = bookingArrSnap.data().bookings
      //console.log(userData.user.id);
     
      //console.log("d"+particularBooking);
      const tempBookingData = [...bookingDataArr]
     
      
     const newBookingData = tempBookingData.filter(data=>data.bookingId!==item.bookingId)

     
      //dispatch(add_notification(notificationFun(item.eventInfo.eventName,"Cancelled")))
      console.log("i",newBookingData);
      dispatch(remove_book(newBookingData))
      const notiObj = {
        id:newBookingData.length+2,
        message:notificationFun(item.eventInfo.eventName,"Cancelled")
      }
      dispatch(add_notification(notiObj))
      await addNotification(notiObj)
      try {
          await updateDoc(bookingArrRef, {
              bookings: newBookingData
          });
      } catch (error) {
          console.log(error);
      }
      console.log("Bookings Cancelled successfully.");
  } else {
      console.log("bookArr document does not exist.");
  }
  }

  const handleUpdate = async() => {
    setloading(true)
    refRBSheet.current.close();
   
    await updateData();
    setloading(false)
    Alert.alert("Booking Updated Successfully")
    props.navigation.pop();
  }

  const addNotification = async(notification) => {

    const userArrRef = doc(firestore, "Users", "usersArr");
    const userArrSnap = await getDoc(userArrRef);
   

    if (userArrSnap.exists()) {
        // Update the userArr document's bookings array with the new booking
        const userDataArr = userArrSnap.data().users;
  
        const particularUser = userDataArr.find(
          (u) => u.id === userData.user.id
        );
  
        const tempUser = { ...particularUser };
  
        const oldNoti = [...tempUser.mynoti];

        oldNoti.push(notification)


      

        const newUserData = {
          ...tempUser,
          mynoti: oldNoti,
        };
  
        const filteredArr = userDataArr.filter(
          (data) => data.id !== userData.user.id
        );
  
        filteredArr.push(newUserData);
  
        try {
          await updateDoc(userArrRef, {
            users: filteredArr,
          });
        } catch (error) {
          console.log(error);
        }
        console.log("Notification Updated successfully.");
      } else {
        console.log("userArr document does not exist.");
      }
      // Clear the form fields after adding the property
    
  
      
  }


  
  const handleCancel = async () => {
    // const totalPrice = 15 * quantity;
    // const eventData = { ...item, quantity, totalPrice };
    // dispatch(storeConfirmedData(eventData));

    setloading(true)
    await removeData()
    Alert.alert("Booking Cancelled Successfully")
    setloading(false)
    props.navigation.pop();
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
      setnewQuantity(newQuantity+1)
    } else if (type === "decrease" && quantity > 1 && newQuantity>1) {
      setQuantity(quantity - 1);
      setnewQuantity(newQuantity-1)
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{
            uri: item.eventInfo.eventImage,
          }}
          style={styles.propertiesImage}
        />

        <View>
          <Text style={styles.cardaddresstext}>{item.eventInfo.eventName}</Text>

          <View style={styles.organizerContainer}>
            <View style={styles.organizerIcon}>
              <MaterialIcons
                name="event-seat"
                size={24}
                color={Colors.primaryColor}
              />
            </View>
            <View
              style={{
                alignItems: "baseline",
                justifyContent: "center",
                margin: 10,
                marginLeft: 10,
              }}
            >
              <Text style={styles.organizerName}>{item.eventInfo.organizerName}</Text>
              <Text style={styles.organizerText}>Organizer</Text>
            </View>
          </View>
          <Text style={styles.descriptionText}>Description</Text>
          <Text style={styles.description}>{item.eventInfo.eventDescription}</Text>
        </View>
        <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => refRBSheet.current.open()}
      >
        <Text style={styles.btnText}>Update Ticket Now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelBtnContainer}
        onPress={handleCancel}
      >
        <Text style={styles.cancelBtnText}>Cancel Booking</Text>
      </TouchableOpacity>
      </ScrollView>
     
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={height * 0.25}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
              marginLeft: 15,
            }}
          >
            <Text style={styles.numoftickets}>Number of tickets</Text>
            <TouchableOpacity onPress={() => handleQuantityChange("decrease")}>
              <MaterialCommunityIcons
                name="minus"
                size={24}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
            <Text style={{ color: Colors.primaryColor, fontSize: 18 }}>
              {quantity}
            </Text>
            <TouchableOpacity onPress={() => handleQuantityChange("increase")}>
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.sheetbtnContainer}
            onPress={handleUpdate}
          >
           {
            newQuantity>0 ? <Text style={styles.sheetbtnText}>
            Book more {newQuantity} Ticket{newQuantity > 1 ? "s" : ""} for $
            {item.eventInfo.ticketPrice * newQuantity}
          </Text>:
           <Text style={styles.sheetbtnText}>
           Cancel
         </Text>
           }
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  propertiesImage: {
    height: height * 0.4,
    width: width,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  cardaddresstext: {
    marginTop: 25,
    width: "100%",
    color: Colors.primaryColor,
    fontWeight: "bold",
    fontSize: 28,
    margin: 20,
  },
  descriptionText: {
    color: Colors.primaryColor,
    margin: 15,
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "gray",
    margin: 10,
    marginHorizontal: 20,
    lineHeight: 25,
  },
  amenityContainer: {
    flexDirection: "row",
    margin: 10,
    marginLeft: 15,
    alignItems: "center",
  },
  organizerContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginLeft: 15,
  },
  organizerText: {
    fontFamily: "Actor-Regular",
  },
  organizerName: {
    color: Colors.primaryColor,

    fontSize: 18,
    fontWeight: "bold",
  },
  organizerIcon: {
    backgroundColor: "#e6e5e8",
    padding: 10,
    borderRadius: 50,
  },
  amenityText: {
    color: "white",
    marginVertical: 10,
    fontSize: 16,
  },
  btnContainer: {
    width: "90%",
    
    bottom: 0,
    backgroundColor: Colors.primaryColor,
    alignSelf: "center",
    margin: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    padding: 20,
    fontSize: 18,
    letterSpacing: 1,
  },
  cancelBtnContainer:{
    width: "90%",
   
   
    backgroundColor: "red",
    alignSelf: "center",
    margin: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: {
    color: "white",
    padding: 20,
    fontSize: 18,
    letterSpacing: 1,
  },
  sheetbtnContainer: {
    width: "90%",
    backgroundColor: Colors.primaryColor,
    alignSelf: "center",
    margin: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetbtnText: {
    color: "white",
    padding: 20,
    fontSize: 18,
    letterSpacing: 1,
  },
  numoftickets: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Actor-Regular",
  },
});

export default BookingDetailPage;
