import CustomSpinner from "@/components/CustomSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { Button, Input, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import loginImg from "../../assets/images/login.png";

const { width } = Dimensions.get("window");

const AuthPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    {
      try {
        //TODO: set up authentication
      } catch (error) {
        console.log(error);
        setErrorText(error.message);
        setErrorVisible(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image source={loginImg} style={styles.image} />
            <Text style={styles.header}>Login</Text>
            <View style={styles.inputContainer}>
              <Input status="primary" label="Sales ID" style={styles.input} />
              <Input
                status="primary"
                label="Password"
                secureTextEntry
                style={styles.input}
              />
            </View>
            <Text style={styles.bottomText}>Forgot password?</Text>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                appearance="filled"
                onPress={() => setErrorVisible(true)}
              >
                Login
              </Button>
            </View>
          </View>
          <CustomSpinner loading={loading} text={"Signing in..."} />
          <ErrorDisplay
            visible={errorVisible}
            setVisible={setErrorVisible}
            text={errorText}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthPage;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  image: {
    alignSelf: "center",
    width: width * 0.75,
    height: width * 0.95,
  },
  header: {
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    lineHeight: 50,
  },
  input: { borderRadius: 9, marginVertical: 5 },
  inputContainer: { margin: 10, padding: 5 },
  bottomText: { marginVertical: 0, color: "grey", marginHorizontal: 15 },
  buttonContainer: { margin: 0 },
  button: { marginVertical: 20, marginHorizontal: 80, borderRadius: 40 },
});
