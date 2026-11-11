import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../constant/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenNames } from "../../../../constant/ScreenNames";

const { width, height } = Dimensions.get("screen");

const BookingConfirmPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>
        <View style = {styles.mainContainer}>
      <View style={styles.textContainer}>
          <Text style={styles.signinText}>Booking Confirmed </Text>
          <Text style={styles.subText}>Please check your mail </Text>
          <Text style={styles.subText}>for confirmation</Text>
        </View>

        <View style = {styles.verificationIconContainer}>
        <MaterialIcons name="verified-user" size={200} color={Colors.primaryColor} style = {styles.verificationIcon} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.replace(ScreenNames.home)}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>DONE</Text>
          </View>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  mainContainer:{
    flex:1,
    height:height*0.8,
    justifyContent:"center"
  },
  
  signinText: {
    fontSize: 30,
    color: Colors.primaryColor,
    letterSpacing: 1,
    margin: 5,
    marginLeft: 20,
    marginBottom: 10,
  },
  signinContainer: {
    padding: 20,
    marginTop: 5,
  },
  buttonContainer: {
    width: width * 0.9,
    height: 50,
    alignSelf: "center",
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
  },

  subText: {
    color:Colors.primaryColor,
    fontSize:20,
    paddingLeft: 20,
    paddingVertical: 2,
    width: width * 0.7,
    letterSpacing: 0.5,
  },
  backIcon: {
    padding: 10,
  },
  textContainer: {
    marginVertical: 10,
    marginBottom:40
  },
  verificationIconContainer:{
    width:width,
    alignItems:"center",
    justifyContent:"center",
    height:height*0.3
  }
});

export default BookingConfirmPage;
