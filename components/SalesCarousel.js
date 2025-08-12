import { Card } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 300;
const SPACING = 12;
const ITEM_SIZE = CARD_WIDTH + SPACING * 2;

export default function SalesCarousel({ salesDetails }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ paddingVertical: 20, backgroundColor: "whitesmoke" }}>
      <Animated.FlatList
        data={salesDetails}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: (width - CARD_WIDTH) / 2 }}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: CARD_WIDTH,
                marginHorizontal: SPACING,
                transform: [{ scale }],
                opacity,
              }}
            >
              <Card style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.7)"]}
                    style={styles.gradientOverlay}
                  />
                  <View style={styles.overlayContent}>
                    <Text style={styles.productName}>{item.product}</Text>
                    <Text style={styles.price}>
                      KES. {item.price.toLocaleString()}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.detailText}>Code: {item.code}</Text>
                  <Text style={styles.detailText}>Colour: {item.colour}</Text>
                  <Text style={styles.detailText}>
                    Qty: {item.quantity} | Comm: KES.{" "}
                    {item.commission.toLocaleString()}
                  </Text>
                  <Text style={styles.detailText}>
                    Salesperson: {item.salesperson}
                  </Text>
                  <Text style={styles.detailText}>Date: {item.date}</Text>
                </View>
              </Card>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginRight: 15,
    padding: 5,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#eee",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  overlayContent: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  productName: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#ffffffff",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10f108ff",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 18,
    color: "#555",
    textAlign: "left",
  },
  infoSection: {
    paddingVertical: 10,
    textAlign: "left",
  },
});
