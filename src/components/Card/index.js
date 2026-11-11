import { Image, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constant/Colors";
import {Ionicons} from '@expo/vector-icons'
import { ScreenNames } from "../../constant/ScreenNames";

const Card = ({showAddress = true,event,props,onPress}) => {
 
  return (
    <TouchableOpacity onPress={onPress ? onPress :() => props.navigation.navigate(ScreenNames.eventDetailPage,{item:event})}>
    <View style={styles.mainCardContainer}>
      <Image
        source={{uri:event.eventImage}}
        style={styles.mainCardImage}
      />
      <View style={styles.mainCardTitleContainer}>
        <Text style={styles.mainTimeCardText}>{event.eventDate}</Text>
        <Text numberOfLines={2} style={styles.mainTitleCardText}>
         {event.eventName}
        </Text>
        {showAddress && <View style={styles.mainCardLocationContainer}>
          <Ionicons name="location" size={18} color="gray" />
          <Text style={styles.mainCardLocationText}>
            {event.eventLocation}{" "}
          </Text>
        </View>}
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainCardImage: {
    height: 75,
    width: 100,
    borderRadius: 10,
  },
  mainCardContainer: {
    margin: 7,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
  },

  mainCardTitleContainer: {
    margin: 10,
  },
  mainTimeCardText: {
    fontSize: 13,
    marginLeft: 5,
    color: "gray",
  },
  mainTitleCardText: {
    fontSize: 18,
    letterSpacing: 1,
    width: "70%",
    margin: 5,
    color: Colors.primaryColor,
  },
  mainCardLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    
    marginTop:5
  },
  mainCardLocationText: {
    color: "gray",
    fontSize: 13,
  },
});
