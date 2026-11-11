import HomeScreen from "../screens/home";
import EventScreen from "../screens/home/EventScreen";
import NotificationScreen from "../screens/home/NotificationScreen";
import ProfileScreen from "../screens/home/ProfileScreen";
import SearchScreen from "../screens/home/SearchScreen";
import { Colors } from "./Colors";
import { Ionicons, MaterialCommunityIcons,Feather,MaterialIcons,FontAwesome } from "@expo/vector-icons";

export const tabBarOptions = {
  Home: {
    headerShown: false,
    tabBarLabel: "Home",
    tabBarActiveTintColor: Colors.primaryColor,
    tabBarIcon: (tabInfo) => {
      return (
        <MaterialCommunityIcons
          name="view-dashboard"
          size={24}
          color={tabInfo.focused ? Colors.primaryColor : "#8e8e93"}
        />
      );
    },
  },
  Search: {
    headerShown: false,

    tabBarLabel: "Search",

    tabBarActiveTintColor: Colors.primaryColor,

    tabBarIcon: (tabInfo) => {
      return (
        <Feather
          name="search"
          size={24}
          color={tabInfo.focused ? Colors.primaryColor : "#8e8e93"}
        />
      );
    },
  },
  Events: {
    headerShown: false,

    tabBarLabel: "Events",

    tabBarActiveTintColor: Colors.primaryColor,

    tabBarIcon: (tabInfo) => {
      return (
        <MaterialIcons
          name="event"
          size={24}
          color={tabInfo.focused ? Colors.primaryColor : "#8e8e93"}
        />
      );
    },
  },
  Notification: {
    headerShown: false,

    tabBarLabel: "Notification",

    tabBarActiveTintColor: Colors.primaryColor,

    tabBarIcon: (tabInfo) => {
      return (
        <Ionicons
          name="notifications"
          size={24}
          color={tabInfo.focused ? Colors.primaryColor : "#8e8e93"}
        />
      );
    },
  },
  Profile: {
    headerShown: false,
    tabBarLabel: "Profile",
    tabBarActiveTintColor: Colors.primaryColor,
    tabBarIcon: (tabInfo) => {
      return (
        <FontAwesome
          name="user"
          size={24}
          color={tabInfo.focused ? Colors.primaryColor : "#8e8e93"}
        />
      );
    },
  },
};
