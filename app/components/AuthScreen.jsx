import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { account } from "../../services/appwrite"; // make sure your appwrite.js exports 'account'

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);

  // Check session on start
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        console.log("User logged in: ", currentUser);
      } catch (err) {
        setUser(null);
      }
    };
    checkSession();
  }, []);

  // Sign up
  const handleSignUp = async () => {
    try {
      setStatus("Creating account...");
      await account.create("unique()", email, password, name);
      await handleLogin(); // auto-login after signup
    } catch (err) {
      setStatus(`Signup error: ${err.message}`);
    }
  };

  // Sign in
  const handleLogin = async () => {
    console.log(account);
    try {
      setStatus("Logging in...");
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      setStatus("Logged in!");
    } catch (err) {
      console.log("Login error:", err.message);
      setStatus(`Login error: ${err.message}`);
    }
  };

  // Logout
  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
    setStatus("Logged out");
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.header}>
            👋 Welcome Beb,{" "}
            {user.name !== "Noa" ? "Noa" : "Louriz" || user.email} 💕!
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push("/main")}
            style={{ marginBottom: 20 }}
            labelStyle={{ color: "white" }}
          >
            Go to Dashboard
          </Button>
          <Button
            title="Logout"
            onPress={handleLogout}
            mode="outlined"
            style={{ marginBottom: 20 }}
            labelStyle={{ color: "red" }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Text style={styles.header}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
          {isSignUp && (
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          )}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button
            onPress={isSignUp ? handleSignUp : handleLogin}
            mode="contained"
            style={{ marginBottom: 20 }}
            labelStyle={{ color: "white" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.link}>
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
          <Text>{status}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  link: {
    color: "blue",
    marginTop: 15,
    textAlign: "center",
  },
});
