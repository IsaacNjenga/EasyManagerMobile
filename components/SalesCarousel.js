import { Card } from "@ui-kitten/components";
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
const CARD_WIDTH = 240;
const SPACING = 20;
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
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.productName}>{item.product}</Text>
                <Text style={styles.detailText}>Code: {item.code}</Text>
                <Text style={styles.detailText}>Colour: {item.colour}</Text>
                <Text style={styles.price}>
                  KES. {item.price.toLocaleString()}
                </Text>
                <Text style={styles.detailText}>Qty: {item.quantity}</Text>
                <Text style={styles.detailText}>
                  Commission: KES. {item.commission.toLocaleString()}
                </Text>
                <Text style={styles.detailText}>
                  Salesperson: {item.salesperson}
                </Text>
                <Text style={styles.detailText}>Date: {item.date}</Text>
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
    width: 250,
    borderRadius: 16,
    marginRight: 15,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  productName: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#057f00",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 18,
    color: "#555",
  },
});
