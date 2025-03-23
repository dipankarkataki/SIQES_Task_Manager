import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PendingTasks, InProgressTasks, CompletedTasks } from "../screens";
import { moderateVerticalScale, scale } from "react-native-size-matters";

const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: scale(14), fontFamily: "Roboto-Medium", marginTop: moderateVerticalScale(10)}, // Customize label
        tabBarIndicatorStyle: { backgroundColor: "#2E78FF", height: 3 }, // Customize indicator
        tabBarStyle: { backgroundColor: "white", height: 60}, // Customize tab bar
      }}
    >
      <Tab.Screen name="Pending" component={PendingTasks} />
      <Tab.Screen name="In Progress" component={InProgressTasks} />
      <Tab.Screen name="Completed" component={CompletedTasks} />
    </Tab.Navigator>
  );
};

export default TopTabsNavigator;
