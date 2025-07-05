import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import PlannerImg from "../assets/images/planner.png";
import { checkAppwriteConnection } from "../services/checkConnection";
import AuthScreen from "./components/AuthScreen";

const HomeScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This is where you can initialize any data or services
    // For example, fetching user data or initializing services
    checkAppwriteConnection();
    const check = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    check();
  }, []);
  if (!user) {
    return <AuthScreen />; // Show AuthScreen if user is not logged in
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={PlannerImg}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Welcome to the Beb Planner App!
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10, textAlign: "center" }}>
        This is where we can manage our tasks and plans.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/main")}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "coral",
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            padding: 10,
            backgroundColor: "coral",
            color: "white",
            borderRadius: 5,
            fontSize: 16,
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
