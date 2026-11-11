import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Platform
} from "react-native";
import React,{useState} from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constant/Colors";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { ScreenNames } from "../../../constant/ScreenNames";
import {auth} from '../../../config/firebase'
import { sendPasswordResetEmail } from "firebase/auth";

const { width, height } = Dimensions.get("screen");

const ResetPasswordScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");


  const handleResetPassword = async() => {
    // Check if any field is empty
    if (!email ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    await sendPasswordResetEmail(auth, email, null)
    .then(() => {
        alert("reset email sent to " + email);
    })
    .catch(function (e) {
        console.log(e);
    });

    // Validation and signup logic here...
    // For demonstration purposes, just navigate to the next screen
    navigation.replace(ScreenNames.verificationPage);
  };


  return (
    <SafeAreaView style={styles.safeareaview}>
      <Ionicons
        name="arrow-back"
        size={24}
        style={{...styles.backIcon,marginTop:Platform.OS === "ios"? 0: 40}}
        color={Colors.primaryColor}
        onPress={() => navigation.pop()}
      />
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.signinText}>Reset Password </Text>
          <Text style={styles.subText}>Please enter your email address </Text>
          <Text style={styles.subText}>request a password reset</Text>
        </View>

        <View style={styles.inputDecoration}>
          <MaterialCommunityIcons name="email-outline" size={24} color="gray" />
          <TextInput placeholder="abc@email.com" style={styles.inputText} onChangeText={setEmail} />
        </View>

        <TouchableOpacity onPress={handleResetPassword}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>SEND</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },

  inputDecoration: {
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
  inputText: {
    padding: 10,
    flex:1
  },
  signinText: {
    fontFamily: "Actor-Regular",
    fontSize: 24,
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
    letterSpacing: 1,
  },

  subText: {
    color: Colors.primaryColor,
    fontFamily: "Actor-Regular",
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
  },
});

export default ResetPasswordScreen;
