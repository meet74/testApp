import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';


export function useAuthentication() {
  const [user, setUser] = React.useState();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('userData', value)
    } catch (e) {
      // saving error
    }
  }

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
        console.log("auth",user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        storeData("true")
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}