import { Spinner } from "@ui-kitten/components";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

const CustomSpinner = ({ loading, text }) => {
  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <Spinner size="large" />
        <Text style={styles.text}>{text ? text : "Loading..."}</Text>
      </View>
    </View>
  );
};

export default CustomSpinner;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height,
    width,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 60,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: "#333",
    lineHeight: 50,
  },
});
