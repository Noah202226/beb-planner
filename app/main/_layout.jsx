import { Tabs } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { account, database } from "../../services/appwrite";
import usePlanStore from "../store/usePlanStore";
import useTaskStore from "../store/useTaskStore";

export default function Layout() {
  const taskStore = useTaskStore((state) => state.tasks);
  const getTasks = useTaskStore((state) => state.getTasks);
  // const authUser = useTaskStore((state) => state.authUser);
  const setAuthUser = useTaskStore((state) => state.setAuthUser);

  const planStore = usePlanStore((state) => state.plans);
  const getPlans = usePlanStore((state) => state.getPlans);

  useEffect(() => {
    getTasks(database);
    getPlans(database);
    // Fetch the current user and set it in the store

    account
      .get()
      .then((user) => {
        console.log("Get user id:", user.name);

        setAuthUser(user); // Set the user in the Zustand store
      })
      .catch((error) => {
        console.error("Error getting user ID:", error);
        setAuthUser("unknown"); // Fallback if user ID cannot be retrieved
      });

    // You can also set up listeners or subscriptions here if needed
  }, []);
  return (
    <PaperProvider>
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
            tabBarBadge: planStore.length > 0 ? planStore.length : undefined,
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
    </PaperProvider>
  );
}
