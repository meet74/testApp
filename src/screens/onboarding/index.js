import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  PixelRatio,
  Pressable,
  Platform
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Colors } from "../../constant/Colors";
import { ScreenNames } from "../../constant/ScreenNames";

const OnBoardingScreen = ({navigation}) => {
  // Intializing Usestates
  const [sliderState, setSliderState] = useState({ currentPage: 0 });

  const { width, height } = Dimensions.get("window");

  // Initializing Refrence for scrollview
  const scrollRef = useRef();

  // Increasing slider page when index of page changes
  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;

    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  // Extracting page number from slider state
  const { currentPage: pageIndex } = sliderState;

  // automatically changing page after time interval
  const onNextPress = () => {
    const nextPage = pageIndex + 1;

    if (nextPage > 2) {
      const offSetX = 0;
      scrollRef.current.scrollTo({ x: offSetX, animated: true });
      setSliderState({
        currentPage: 0,
      });
    } else {
      const offSetX = nextPage * width;
      scrollRef.current.scrollTo({ x: offSetX, animated: true });
      setSliderState({
        currentPage: nextPage,
      });
    }
  };

  useEffect(() => {
    const slideTimer = setInterval(() => {
      onNextPress();
    }, 3000);

    return () => clearInterval(slideTimer);
  });

  return (
    <>
      <SafeAreaView style={styles.safeareaview}>
        <Pressable onPress={()=> navigation.replace(ScreenNames.signIn)}>
        <Text style={{...styles.skipText, margin:Platform.OS === "ios"? 0: 40}}>Skip</Text>
        </Pressable>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height }}>
            <Image
              source={require("../../../assets/images/onboarding-1.jpg")}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Step into the World of Events</Text>
              <Text style={styles.paragraph}>
                Explore Limitless Entertainment: From Blockbusters to Exclusive
                Events, Find Your Next Adventure Here.
              </Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require("../../../assets/images/onboarding-2.jpg")}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Unlock Your Event Journey</Text>
              <Text style={styles.paragraph}>
                Personalized Recommendations: Let Us Guide You to Unforgettable
                Experiences Tailored to Your Tastes
              </Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require("../../../assets/images/onboarding-3.jpg")}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Embark on a Ticketing Adventure</Text>
              <Text style={styles.paragraph}>
                Seamless Booking Experience: Say Goodbye to Hassle and Hello to
                Effortless Ticket Reservations
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(3).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                { opacity: pageIndex === index ? 1 : 0.2 },
              ]}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: "white",
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(150),
    width: "100%",
    resizeMode: "contain",
  },
  skipText: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginRight: 25,
    alignSelf: "flex-end",
    
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 20,
    marginHorizontal: 20,

    width: "75%",
  },
  paragraph: {
    fontSize: 17,
    color: "gray",
    alignSelf: "flex-start",
    marginHorizontal: 20,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 5,
    width: 25,
    backgroundColor: Colors.primaryColor,
    marginLeft: 10,
  },
});

export default OnBoardingScreen;
