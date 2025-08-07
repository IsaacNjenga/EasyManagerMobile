import { Button, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import helloImg from "../../assets/images/hello.png";

const AuthScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={helloImg} style={styles.image} />
      <View style={styles.textContainer}>
        <Text category="h1" style={styles.header}>
          Hello
        </Text>
        <Text category="p" style={styles.subtitle}>
          Welcome to EasyManager, manage your store at the simple click of a
          button
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          appearance="filled"
          onPress={() => {
            router.replace("/(auth)/auth");
          }}
        >
          LOGIN
        </Button>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: 400,
    height: 400,
    marginHorizontal: "auto",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
    padding: 10,
  },
  header: { marginBottom: 25, fontSize: 60 },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  buttonContainer: { margin: 0 },
  button: { marginVertical: 20, marginHorizontal: 60, borderRadius: 40 },
});
