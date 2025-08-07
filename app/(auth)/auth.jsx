import ChangePassword from "@/components/ChangePassword";
import CustomSpinner from "@/components/CustomSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { useAuthStore } from "@/providers/AuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { login, isCheckingAuth } = useAuthStore();

  const onLogin = async () => {
    setLoading(true);
    {
      try {
        const result = await login(number, password);
        if (!result.success) {
          console.log(result.message || {});
          setErrorText(
            result.message || "There was an unexpected error on sign up!"
          );
        } else {
          console.log("Login successful!");
          setId("");
          setPassword("");
        }
      } catch (error) {
        console.log(error);
        setErrorText(error.message);
        setErrorVisible(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      {secureTextEntry ? (
        <Ionicons name="eye-off" size={18} color="black" />
      ) : (
        <Ionicons name="eye" size={18} color="black" />
      )}
    </TouchableWithoutFeedback>
  );

  if (isCheckingAuth) {
    return null;
  }

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
              <Input
                status="primary"
                label="Sales ID"
                style={styles.input}
                value={number}
                onChangeText={(value) => setNumber(value)}
              />
              <Input
                status="primary"
                label="Password"
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
                style={styles.input}
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
            </View>
            <Button
              appearance="ghost"
              style={styles.bottomText}
              onPress={() => setPasswordVisible(true)}
            >
              Forgot password?
            </Button>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                appearance="filled"
                onPress={onLogin}
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
          <ChangePassword
            visible={passwordVisible}
            setVisible={setPasswordVisible}
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
    lineHeight: 80,
  },
  input: { borderRadius: 9, marginVertical: 5 },
  inputContainer: { margin: 10, padding: 5 },
  bottomText: {
    marginVertical: 0,
    color: "grey",
    marginHorizontal: 100,
    lineHeight: 50,
  },
  buttonContainer: { margin: 0 },
  button: { marginVertical: 20, marginHorizontal: 80, borderRadius: 40 },
});
