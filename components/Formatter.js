import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AnimatedNumbers from "react-native-animated-numbers";

const Formatter = ({ value, fontColor, fontSize }) => {
  const [num, setNum] = useState(null); // null to indicate "not loaded yet"

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setNum(value);
    }
  }, [value]);

  if (num === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedNumbers
        includeComma
        animateToNumber={num}
        fontStyle={{
          fontSize: fontSize || 32,
          fontWeight: "bold",
          color: fontColor || "#333",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Formatter;
