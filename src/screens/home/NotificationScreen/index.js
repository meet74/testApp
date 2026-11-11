import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "../../../constant/Colors";
import { useDispatch, useSelector } from "react-redux";
import NotificationCard from "../../../components/notificationCard";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { remove_notification } from "../../../store/action/userAction";

const { width, height } = Dimensions.get("screen");

const NotificationScreen = () => {
  const userData = useSelector((state) => state.user);
  console.log("notification",userData.user.mynoti);
  const removeNotification = async (id) => {
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

      const filteredNoti = oldNoti.filter((noti) => noti.id !== id);
      dispatch(remove_notification(id))

      const newUserData = {
        ...tempUser,
        mynoti: filteredNoti,
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
  };

  const dispatch = useDispatch()


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>Notification</Text>
        {userData.user.mynoti.length ? (
          userData.user.mynoti.map((data) => {
            console.log(data);
            return (
              <NotificationCard
                onClose={() => removeNotification(data.id)}
                message={data.message.message}
              />
            );
          })
        ) : (
          <View style={styles.noNotificationContainer}>
            <Image
              resizeMode="contain"
              style={styles.noNotificationImage}
              source={require("../../../../assets/images/Artwork.png")}
            />
            <Text style={styles.nonotificationText}>No Notifications!!</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleText: {
    margin: 15,
    letterSpacing: 0.5,
    fontSize: 25,
    marginTop: 20,
    color: Colors.primaryColor,
  },
  noNotificationContainer: {
    flex: 1,
    height: height * 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  noNotificationImage: {
    height: width * 0.8,
    width: height * 0.3,
  },
  nonotificationText: {
    color: Colors.primaryColor,
    fontSize: 18,
  },
});

export default NotificationScreen;
