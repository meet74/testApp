import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../../constant/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ScreenNames } from "../../../constant/ScreenNames";
import { auth,firestore } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDoc,doc, getDoc} from 'firebase/firestore'
import { data } from "../../../constant/DummyData";
import { set_user } from "../../../store/action/userAction";
import { useDispatch } from "react-redux";

const { width, height } = Dimensions.get("screen");
const LoginScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('userData', value)
    } catch (e) {
     console.log(e);
    }
  }

  const addDataToDocument = async () => {
    const documentId = "Pd7qonxYNmzUwpnNmkOW"
    try {
       await setDoc(doc(firestore, "Events", documentId), data);
       console.log("Document successfully written!");
    } catch (e) {
       console.error("Error writing document: ", e);
    }
   };


  const handleSignin = async () => {
    // Check if any field is empty
    if (value.email === "" || value.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, value.email, value.password);
      console.log(userCred.user.uid);
      try {
        // Reference the document
        const docRef = doc(firestore, "Users", "usersArr");
    
        // Retrieve the document
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const userArr = docSnap.data().users
          const currentUser = userArr.find(u=>u.id === userCred.user.uid)
          console.log(currentUser);
          dispatch(set_user(currentUser))
        } else {
          console.log("No such document!");
          return null;
        }
     } catch (error) {
        console.error("Error getting document:", error);
        return null;
     }
      navigation.replace(ScreenNames.bottomTabBar);
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "User not found. Please check your email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Invalid password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        default:
          errorMessage = "An error occurred. Please try again later.";
      }
      setValue({
        ...value,
        error: errorMessage,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/images/logo.png")}
          style={styles.logoImg}
        />
        <Text style={styles.logoTxt}>TicktEase</Text>
      </View>
      <View style={styles.signinContainer}>
        <Text style={styles.signinText}>Sign in</Text>
        {!!value.error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{value.error}</Text>
          </View>
        )}
        <View style={styles.inputDecoration}>
          <MaterialCommunityIcons name="email-outline" size={24} color="gray" />
          <TextInput
            placeholder="abc@email.com"
            style={styles.inputText}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
        </View>
        <View style={styles.inputDecoration}>
          <MaterialIcons name="lock-outline" size={24} color="gray" />
          <TextInput
            secureTextEntry={true}
            placeholder="Your password"
            style={styles.inputText}
            onChangeText={(text) => setValue({ ...value, password: text })}
          />
        </View>
        <View style={styles.forgotpasscontainer}>
          {/* <View style={styles.switchContainer}>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primaryColor }}
              style={styles.switchStyle}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />

            <Text style={styles.rememberme}>Remember me</Text>
          </View> */}
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.resetPassword)}
          >
            <Text style={styles.rememberme}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSignin}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Sign in</Text>
          </View>
        </TouchableOpacity>

        
      </View>


      <View style={styles.alreadyTextContainer}>
        <Text style={styles.alreadyText}>Don't have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    backgroundColor: "#f7fafc",
    flex: 1,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logoImg: {
    height: 150,
    width: 200,
    resizeMode: "contain",
  },
  logoTxt: {
    fontFamily: "Actor-Regular",
    fontSize: 35,
    color: Colors.primaryColor,
    letterSpacing: 1,
  },
  inputDecoration: {
    borderWidth: 1,
    margin: 10,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  inputText: {
    padding: 10,
    flex: 1,
  },
  rememberme:{
    margin:5
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
  switchStyle: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgotpasscontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
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
  orTextContainer: {
    alignItems: "center",
  },
  orText: {
    fontSize: 18,
    color: "gray",
    fontWeight: "400",
  },
  googleButtonContainer: {
    width: width * 0.8,
    height: 50,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  googleLogo: {
    height: 30,
    width: 30,
    marginHorizontal: 15,
  },
  googleButtonText: {
    fontSize: 15,
  },
  alreadyText: {
    marginHorizontal: 10,
  },

  signUpText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
  alreadyTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
  },
  error: {
    marginTop: 10,
    padding: 10,
  },
  errorText: {
    color: "red",
  },
});

export default LoginScreen;
