import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PendingTasks, InProgressTasks, CompletedTasks } from "../screens";

const Tab = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarIndicatorStyle: { backgroundColor: "#2E78FF", height: 3 }, // Customize indicator
        tabBarStyle: { backgroundColor: "white" }, // Customize tab bar
      }}
    >
      <Tab.Screen name="Pending Tasks" component={PendingTasks} />
      <Tab.Screen name="In Progress Tasks" component={InProgressTasks} />
      <Tab.Screen name="Completed Tasks" component={CompletedTasks} />
    </Tab.Navigator>
  );
};

export default TopTabsNavigator;
