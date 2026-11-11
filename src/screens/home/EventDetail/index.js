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
} from "react-native";
import { Colors } from "../../../constant/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ScreenNames } from "../../../constant/ScreenNames";
import { useDispatch, useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import { storeConfirmedData } from "../../../store/action/EventAction";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase";

const { width, height } = Dimensions.get("screen");

const EventDetailScreen = (props) => {
  const { item } = props.route.params;
  const [quantity, setQuantity] = useState(1);
  const refRBSheet = useRef();
  const userData = useSelector((state) => state.user);
  const bookingData = useSelector((state) => state.book);
  console.log(userData);
  const dispatch = useDispatch();
  const checkIfItsBooked = () => {
    return bookingData.books.find((data) => data.eventInfo.id === item.id);
  };
  const handleBooking = async () => {
    // const totalPrice = 15 * quantity;
    // const eventData = { ...item, quantity, totalPrice };
    // dispatch(storeConfirmedData(eventData));

    refRBSheet.current.close();

    props.navigation.navigate(ScreenNames.paymentpage, {
      item,
      quantity,
      total: parseInt(item.ticketPrice),
    });
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{
            uri: item.eventImage,
          }}
          style={styles.propertiesImage}
        />

        <View>
          <Text style={styles.cardaddresstext}>{item.eventName}</Text>

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
              <Text style={styles.organizerName}>{item.organizerName}</Text>
              <Text style={styles.organizerText}>Organizer</Text>
            </View>
          </View>
          <Text style={styles.descriptionText}>Description</Text>
          <Text style={styles.description}>{item.eventDescription}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => refRBSheet.current.open()}
      >
        <Text style={styles.btnText}>Book Ticket Now</Text>
      </TouchableOpacity>
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
            onPress={handleBooking}
          >
            <Text style={styles.sheetbtnText}>
              Book {quantity} Ticket{quantity > 1 ? "s" : ""} for £
              {parseInt(item.ticketPrice) * quantity}
            </Text>
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
    position: "absolute",
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

export default EventDetailScreen;
