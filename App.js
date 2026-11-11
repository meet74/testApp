import React, { useCallback, useEffect, useState } from 'react';
import Navigator from './src/navigator';
import { Text, View } from 'react-native';
import SignUpScreen from './src/screens/auth/SignUp';
import LoginScreen from './src/screens/auth/Login';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

// Keep the splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Actor-Regular': require('./assets/fonts/Actor-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Do not render UI until fonts are loaded
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    </View>
  );
}
