import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { BaseUrl } from "./configuration";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useStationData } from "./useStationData";

function HomeScreen({ navigation }) {
  const stuff = useStationData();
  return (
    <View style={styles.container}>
      <Text>hello I can change things! {BaseUrl}</Text>
      <Text>{JSON.stringify(stuff)}</Text>

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Home2")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home3" component={HomeScreen} />
        <Stack.Screen name="Home2" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
