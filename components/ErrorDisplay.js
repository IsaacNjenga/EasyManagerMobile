import { Button, Card, Modal, Text } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import errorImg from "../assets/images/error.png";

const ErrorDisplay = ({ text, visible, setVisible }) => {
  const dismiss = () => setVisible(false);

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dismiss}
    >
      <Card disabled={true} style={styles.card}>
        <View style={styles.container}>
          <Image source={errorImg} style={styles.image} />
          <Text category="h5" status="danger" style={styles.message}>
            {text || "There was an unexpected error. Kindly try again later"}
          </Text>
          <Button onPress={dismiss} style={styles.button}>
            Dismiss
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

export default ErrorDisplay;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    borderRadius: 10,
    width: 350,
    padding: 10,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "60%",
    borderRadius: 30,
  },
});
