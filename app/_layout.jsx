import Entypo from "@expo/vector-icons/Entypo";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
        headerStyle: {
          backgroundColor: "coral",
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },

        contentStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: "HOME" }} />
      <Stack.Screen
        name="main"
        options={{
          title: "BEB PLANNER",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: -20, padding: 1 }}>
              <Entypo name="info-with-circle" size={18} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
