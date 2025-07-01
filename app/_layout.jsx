import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack 
    screenOptions={
      {
        animation: "fade_from_bottom",
        headerStyle: {
          backgroundColor: 'coral',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
  
        contentStyle: {
          backgroundColor: 'white',
        },
        headerShadowVisible: false,
      }
    }
  >
    <Stack.Screen name="index" options={{ title: "HOME" }}  />
    <Stack.Screen name="main" options={{ title: "BEB PLANNER" }} />
    
  </Stack>;
}
