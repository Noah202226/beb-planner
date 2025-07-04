import { Tabs } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useTaskStore from "../store/useTaskStore";

export default function Layout() {
  const taskStore = useTaskStore((state) => state.tasks);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "teal",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "DASHBOARD",
          tabBarIcon: (color, size) => (
            <MaterialIcons name="space-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          tabBarLabel: "Finance",
          tabBarIcon: (color, size) => (
            <FontAwesome5 name="tasks" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          tabBarLabel: "Task",
          tabBarIcon: (color, size) => (
            <FontAwesome5 name="tasks" size={size} color={color} />
          ),
          tabBarBadge: taskStore.length > 0 ? taskStore.length : undefined,
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          tabBarLabel: "Plans",
          tabBarIcon: (color, size) => (
            <AntDesign name="Trophy" size={size} color={color} />
          ),
          tabBarBadge: 1,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: (color, size) => (
            <MaterialIcons name="space-dashboard" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
