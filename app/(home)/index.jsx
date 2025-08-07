import { useAuthStore } from "@/providers/AuthStore";
import { Button } from "@ui-kitten/components";
import React from "react";
import { Text, View } from "react-native";

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={logout}>Log out</Button>
    </View>
  );
};

export default HomeScreen;
