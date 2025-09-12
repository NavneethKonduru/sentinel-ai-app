import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SafeRouteScreen from "../screens/SafeRouteScreen";
import BuddyScreen from "../screens/BuddyScreen";
import ReportsScreen from "../screens/ReportsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#1993F5",
        tabBarInactiveTintColor: "#7C8491",
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: "#0B1623", 
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter-Medium",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          
          if (route.name === "Home") iconName = "home";
          else if (route.name === "SafeRoute") iconName = "map";
          else if (route.name === "Buddy") iconName = "people";
          else if (route.name === "Reports") iconName = "alert-circle";
          else if (route.name === "Profile") iconName = "person";
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SafeRoute" component={SafeRouteScreen} />
      <Tab.Screen name="Buddy" component={BuddyScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}