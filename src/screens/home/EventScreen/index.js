import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { Colors } from "../../../constant/Colors";
import { dummyCities } from "../../../constant/DummyData";
import Card from "../../../components/Card";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ScreenNames } from "../../../constant/ScreenNames";

const { width, height } = Dimensions.get("screen");

const EventScreen = (props) => {
  const bookingData = useSelector((state) => state.book);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>Events</Text>
        {/* <View style = {styles.topBar}>
        <View style = {{backgroundColor:"white",margin:5,borderRadius:15}}>
        <Text style = {styles.topBarUpciomingText}>Upcoming</Text>
        </View>
       <View style = {styles.pastEventsUpciomingContainer}>
       <Text style = {styles.pastEventsUpciomingText}>Past Events</Text>
       </View>
      </View> */}
        {bookingData.books.length ? (
          bookingData.books.map((item) => {
            return <Card onPress = {() => props.navigation.navigate(ScreenNames.bookingDetailPage,{item})} event={item.eventInfo} props={props} />;
          })
        ) : (
          <View style={styles.noEventContainer}>
            <MaterialIcons
              name="event"
              size={100}
              color={Colors.primaryColor}
            />
            <Text style={styles.noEventText}>No Events!!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  titleText: {
    margin: 15,
    letterSpacing: 0.5,
    fontSize: 25,
    marginTop: 20,
    color: Colors.primaryColor,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",

    margin: 25,
    backgroundColor: "rgba(155,155,155,0.2)",

    borderRadius: 20,
  },
  topBarUpciomingText: {
    color: Colors.primaryColor,
    padding: 10,
    paddingHorizontal: 40,
  },
  pastEventsUpciomingText: {
    color: "#9B9B9B",
  },
  noEventContainer: {
    flex: 1,
    height: height * 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  noEventImage: {
    height: width * 0.8,
    width: height * 0.3,
  },
  noEventText: {
    color: Colors.primaryColor,
    fontSize: 20,
    margin: 20,
  },
});
export default EventScreen;
