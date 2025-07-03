import { account } from "./appwrite.js";

export const checkAppwriteConnection = async () => {
  try {
    // Try to get the current session (even if not logged in, it still reaches the server)
    const session = await account.get();
    console.log("✅ Appwrite client is connected. Session:", session);
  } catch (error) {
    // Even if there's no session, this means client reached Appwrite server
    if (error.code === 401) {
      console.log("✅ Appwrite client is connected. No active session.");
    } else {
      console.error("❌ Failed to connect to Appwrite:", error);
    }
  }
};
// Call this function in your main app component or wherever you initialize your app
