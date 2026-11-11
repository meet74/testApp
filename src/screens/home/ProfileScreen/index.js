import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { auth } from "../../../config/firebase";
import { ScreenNames } from "../../../constant/ScreenNames";
import { Colors } from "../../../constant/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { sign_out } from "../../../store/action/userAction";
import { clearPersistedStore } from "../../../store";

const { width, height } = Dimensions.get("screen");

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    auth.signOut();
    dispatch(sign_out());
    clearPersistedStore()
      .then(() => {
        console.log("Persisted store cleared successfully.");
      })
      .catch((error) => {
        console.error("Error clearing persisted store:", error);
      });
    navigation.navigate(ScreenNames.authFlow);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Your Profile</Text>
      <View style={styles.profile_container}>
        <Image
          source={require("../../../../assets/images/profile_image.jpeg")}
          style={{
            borderRadius: 100,
            height: 130,
            width: 130,
            resizeMode: "cover",
          }}
        />
        <Text style={styles.profile_name}>Micheal Dam</Text>
      </View>
      <Text style={styles.descriptionText}>Description</Text>
      <Text style={styles.description}>
        Hey there! I'm an enthusiastic tech aficionado with a passion for
        exploring the latest innovations in the digital world. As a curious
        learner, I'm always diving into new technologies and concepts, eager to
        expand my knowledge and skill set.
      </Text>
      <TouchableOpacity onPress={handleSignOut}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign out</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  headerText: {
    fontSize: 26,
    color: Colors.buttonColor,
    margin: 15,
    fontWeight: "500",
  },
  buttonContainer: {
    width: width * 0.8,
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
  },
  descriptionText: {
    color: Colors.primaryColor,
    margin: 15,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "gray",
    margin: 10,
    marginHorizontal: 20,
    lineHeight: 25,
  },
  profile_name: {
    color: Colors.primaryColor,
    fontSize: 24,
    margin: 20,
    fontWeight: "bold",
  },
  profile_container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 30,
  },
});

export default ProfileScreen;
