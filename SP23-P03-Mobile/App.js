import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { BaseUrl } from "./configuration";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useStationData } from "./useStationData";

const AuthCookieContext = React.createContext({
  loginState: {
    user: null,
  },
  setLoginState: (
    loginState = {
      user: null,
    }
  ) => {},
});
function HomeScreen({ navigation }) {
  const { loginState } = React.useContext(AuthCookieContext);
  const stuff = useStationData();
  return (
    <View style={styles.container}>
      <Text>
        hello, {loginState?.user?.userName ?? "human"}! I can change things!{" "}
        {BaseUrl}
      </Text>
      <Text>{JSON.stringify(stuff)}</Text>
      <Text>{process.env.NODE_ENV}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

function LoginScreen({ navigation }) {
  const { setLoginState } = React.useContext(AuthCookieContext);
  const [userName, setUsername] = useState("bob");
  const [password, setPassword] = useState("Password123!");

  useEffect(() => {
    fetch(`${BaseUrl}/api/authentication/me`)
      .catch((x) => {
        console.log(x);
      })
      .then((x) => x.json())
      .catch((x) => {
        console.log(x);
      })
      .then((x) => {
        setLoginState({ user: x });
        navigation.replace("Home");
      });
  }, [navigation, setLoginState]);
  return (
    <View style={styles.container}>
      <TextInput
        value={userName}
        onChangeText={(e) => setUsername(e)}
        placeholder={"UserName"}
        style={styles.TextInput}
      />

      <TextInput
        value={password}
        onChangeText={(e) => setPassword(e)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.TextInput}
      />

      <Button title="Submit Login" onPress={submit} />
    </View>
  );

  function submit() {
    fetch(`${BaseUrl}/api/authentication/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((x) => {
        // if we want to persist the cookie using something other than fetch to include it
        // const authCookie = x.headers
        //   .get("set-cookie")
        //   .split(";")
        //   .find((x) => x.startsWith(".AspNetCore.Identity.Application="))
        //   .split("=")[1];

        // setLoginState({ authCookie });

        return x.json();
      })
      .then((x) => {
        setLoginState({ user: x });
        navigation.push("Home");
      });
  }
}

const Stack = createNativeStackNavigator();
export default function App() {
  const [loginState, setLoginState] = useState({
    authCookie: "",
    user: {},
  });

  return (
    <AuthCookieContext.Provider value={{ loginState, setLoginState }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthCookieContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    margin: "10px",
    border: "1px solid red",
  },
});
