import { Button, Card, Input, Modal, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomSpinner from "./CustomSpinner";
import ErrorDisplay from "./ErrorDisplay";

const ChangePassword = ({ visible, setVisible }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [spinnerText, setSpinnerText] = useState("");

  const dismiss = () => setVisible(false);

  const getOtp = async () => {
    setLoading(true);
    try {
      setOtpRequested(true);
      setSpinnerText("Sending...");
    } catch (error) {
      console.log(error);
      setErrorText(error.message);
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      setOtpVerified(true);
      setSpinnerText("Verifying...");
    } catch (error) {
      console.log(error);
      setErrorText(error.message);
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    setLoading(true);
    try {
    } catch (error) {
      console.log(error);
      setErrorText(error.message);
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop}>
      <Card disabled={true} style={styles.card}>
        <View style={styles.container}>
          <Text category="h2">Change your password</Text>

          <View style={styles.inputRow}>
            <Input
              status="primary"
              label="Enter your email"
              style={styles.inputFlex}
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Button onPress={getOtp} style={styles.inlineButton}>
              Get OTP
            </Button>
          </View>

          <View style={styles.inputRow}>
            <Input
              status="primary"
              label="Enter the OTP sent to you"
              style={styles.inputFlex}
              value={otp}
              onChangeText={(value) => setOtp(value)}
              disabled={!otpRequested}
            />
            <Button
              onPress={verifyOtp}
              style={styles.inlineButton}
              disabled={!otpRequested}
            >
              Verify OTP
            </Button>
          </View>

          <Input
            status="primary"
            label="Set your new password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={(value) => setPassword(value)}
            disabled={!otpVerified || !otpRequested}
          />
          <Input
            status="primary"
            label="Re-enter your new password"
            secureTextEntry
            style={styles.input}
            value={retypePassword}
            onChangeText={(value) => setRetypePassword(value)}
            disabled={!otpVerified || !otpRequested}
          />
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={changePassword}>
              Change password
            </Button>
            <Button onPress={dismiss} status="danger" style={styles.button}>
              Cancel
            </Button>
          </View>
        </View>
      </Card>
      <CustomSpinner loading={loading} text={spinnerText} />
      <ErrorDisplay
        visible={errorVisible}
        setVisible={setErrorVisible}
        text={errorText}
      />
    </Modal>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    borderRadius: 10,
    width: 380,
    padding: 10,
  },
  container: { alignItems: "center", justifyContent: "center", gap: 20 },
  inputContainer: { margin: 10, padding: 5 },
  input: { borderRadius: 9, marginVertical: 5 },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-between",
    gap: 20,
    flexDirection: "row",
    margin: 10,
  },
  button: {
    width: "50%",
    borderRadius: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  inputFlex: {
    flex: 1,
    borderRadius: 9,
  },
  inlineButton: {
    height: 35,
    borderRadius: 10,
  },
});
