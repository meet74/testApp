import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {Ionicons} from '@expo/vector-icons'
import { Colors } from "../../constant/Colors";
import { ScreenNames } from "../../constant/ScreenNames";

const GridCard = ({item,props}) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(ScreenNames.eventDetailPage,{item:item})}>
     <View style={styles.upcomingEventCard}>
      <ImageBackground
        borderRadius={10}
        source={{uri:item.eventImage}}
        style={styles.upcomingImage}
      >
        <View style={styles.upcomingEventCardDateContainer}>
          <Text style={styles.upcomingEventCardDateText}>10</Text>
          <Text style={styles.upcomingEventCardDateText}>June</Text>
        </View>
      </ImageBackground>
      <Text style={styles.upcomingEventCardTitleText}>{item.eventName} </Text>
      <View style={styles.upcomingEventCardLocationContainer}>
        <Ionicons name="location" size={18} color="gray" />
        <Text style={styles.upcomingEventCardLocationText}>
          {item.eventLocation}{" "}
        </Text>
      </View>
    </View>
   </TouchableOpacity>
  );
};

export default GridCard;

const styles = StyleSheet.create({
  
  upcomingImage: {
    height: 150,
    width: 250,
    alignSelf:"center"
  },
  upcomingEventCard: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    height: 280,
    width: 300,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
  },
  upcomingEventCardDateContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    margin: 5,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
  },
  upcomingEventCardDateText: {
    color: Colors.upcomingCardprimarycolor,
    fontSize: 16,
  },
  upcomingEventCardLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
  },
  upcomingEventCardTitleText: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    
    fontSize: 22,
    color: Colors.primaryColor,
    fontFamily: "Actor-Regular",
    letterSpacing: 0.5,
  },
  upcomingEventCardLocationText: {
    color: "gray",
    fontSize: 13,
  },
});
