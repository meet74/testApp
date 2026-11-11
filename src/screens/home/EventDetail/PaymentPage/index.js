import React, { useState } from "react";
import Constants from "expo-constants";
import { View, Text, StyleSheet, TextInput, Image, Alert, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { CardField, StripeProvider, useConfirmPayment } from "@stripe/stripe-react-native";
import { Colors } from "../../../../constant/Colors";
import Receipt from "../../../../components/Reciept";
import { ScreenNames } from "../../../../constant/ScreenNames";
import { firestore } from "../../../../config/firebase";
import { arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { add_notification } from "../../../../store/action/userAction";
import { SafeAreaProvider as SafeAreaView} from 'react-native-safe-area-context';
import { set_book } from "../../../../store/action/bookingAction";

//ADD localhost address of your server
const API_URL = "http://localhost:3000";
const PUBLISHABLE_KEY = "pk_test_51RNma2QvxRuzP3DufhoGGsPGHYQK6t2VNf0zne2ZT5Io0fkIYGI5kmvqqHbCYE4SzacXgkQPQ3s65gJnQ17jabzU00lGP9kNKv";


const PaymentPage = (props) => {
    const {item,quantity,total} = props.route.params
    
  const [email, setEmail] = useState();
 
  const [cardDetails, setCardDetails] = useState();
  const userData = useSelector(state=>state.user)
  const notificationFun = (title, type) => { return {
    message:`Your ticket for ${title} is ${type}`
  }}

  const [loading, setLoading] = useState(false)
  const { confirmPayment } = useConfirmPayment();
 const dispatch = useDispatch();
  const SECRET_KEY = Constants.expoConfig.extra.stripeSecretKey;
  
  
  
  const fetchPaymentIntentClientSecret = async () => {
    console.log("Shreehari");
    const response = await fetch(`https://tempserver-g2dr.onrender.com/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SECRET_KEY}`,
      },
    //   body: JSON.stringify({
    //     email: email, // Include the email entered by the user
    //   }),
    });
    const { clientSecret, error } = await response.json();
    console.log("client",clientSecret);
    return { clientSecret, error };
  };

  const addData = async() => {
    const bookingArrRef = doc(firestore, "bookings", "bookingArr");
    const bookingArrSnap = await getDoc(bookingArrRef);

  
    if (bookingArrSnap.exists()) {
      // Update the userArr document's bookings array with the new booking
      const bookingDataArr = bookingArrSnap.data().bookings
      //console.log(userData.user.id);
     
      //console.log("d"+particularBooking);
      const tempBookingData = [...bookingDataArr]
      const bookingObj = {
        bookingId:(tempBookingData.length+2).toString(),
        eventInfo: item,
        quantity,
        userId: userData.user.id,
      };
      
      tempBookingData.push(bookingObj)
      const notiObj = {
        id:tempBookingData.length+2,
        message:notificationFun(item.eventName,"Booked")
      }
      dispatch(add_notification(notiObj))
      await addNotification(notiObj)
      dispatch(set_book(tempBookingData))
  
      try {
          await updateDoc(bookingArrRef, {
              bookings: tempBookingData
          });
      } catch (error) {
          console.log(error);
      }
      console.log("Bookings Added successfully.");
  } else {
      console.log("bookArr document does not exist.");
  }

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
        console.log("noti",newUserData.mynoti);
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


  const handlePayPress = async () => {
    setLoading(true)
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, clerror } = await fetchPaymentIntentClientSecret();
      console.log("err",clientSecret);
      //2. confirm the payment
      
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
          paymentMethodType:"Card",
        });
        console.log(paymentIntent);
        
          
          //props.navigation.pop()
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
          await addData();
          props.navigation.navigate(ScreenNames.properties)
      
    } catch (e) {
      console.log(e);
     // props.navigation.pop()
    } finally{
      setLoading(false)
    }
    //3.Confirm the payment with the card details
  };

  console.log(total+' S '+quantity)
  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>

    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.imgContainer}>
        <Image
          source={require("../../../../../assets/images/logo.png")}
          style={styles.logoImg}
        />
        <Text style={styles.logoTxt}>TicktEase</Text>
      </View>
      
     
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
      
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
         
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <Receipt price={total} quantity = {quantity}/>
      <TouchableOpacity disabled = {loading} style={styles.addButton} onPress={handlePayPress}>
           {loading ?<View style = {styles.indicator}>
           <Text style={styles.buttonText}>Payment in progress...</Text>
           <ActivityIndicator/>
           </View> : <Text style={styles.buttonText}>Pay Now</Text>}
            </TouchableOpacity>
    </ScrollView>
    </StripeProvider>
  );
};
export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    
    backgroundColor:Colors.backgroundColor
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicator:{
    flexDirection:"row"
  },
  logoImg: {
    height: 100,
    width: 150,
    resizeMode: "contain",
  },
  logoTxt: {
    fontSize: 35,
    color: Colors.primaryColor,
    margin: 20,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#efefefef",
    margin:15,
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  addButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width:"90%",
    alignSelf:"center"
},
buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
},
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    margin: 15,
  },
});