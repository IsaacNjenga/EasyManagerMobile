import { Card } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
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

export const ItemImageCarousel = ({ item }) => {
  // Filter out empty strings or invalid URLs
  const validImages =
    Array.isArray(item.image) && item.image.length > 0
      ? item.image.filter((img) => img && img.trim() !== "")
      : [];

  const fallbackImage = require("../assets/images/fallback.png");

  // State for carousel index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carousel effect (auto-cycle every 3 seconds)
  useEffect(() => {
    if (validImages.length <= 1) return; // No carousel if only one or zero images

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 < validImages.length ? prevIndex + 1 : 0
      );
    }, 2500); // 3 seconds

    return () => clearInterval(interval);
  }, [validImages.length]);

  return (
    <View>
      <Image
        source={
          validImages.length > 0
            ? { uri: validImages[currentIndex] }
            : fallbackImage
        }
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default function SalesCarousel({ salesDetails }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ paddingVertical: 20, backgroundColor: "whitesmoke" }}>
      <Animated.FlatList
        data={salesDetails}
        keyExtractor={(item) => item?._id.$oid}
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
                  {/* <Image
                    source={
                      item.image &&
                      item.image.length > 0 &&
                      item.image[0].trim() != ""
                        ? { uri: item.image[0] }
                        : require("../assets/images/fallback.png")
                    }
                    style={styles.image}
                    resizeMode="cover"
                  /> */}

                  <ItemImageCarousel item={item} />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.7)"]}
                    style={styles.gradientOverlay}
                  />
                  <View style={styles.overlayContent}>
                    <Text style={styles.productName}>{item.description}</Text>
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
                    Salesperson: {item.saleperson}
                  </Text>
                  <Text style={styles.detailText}>
                    Date Sold:
                    {new Date(item.datesold).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
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
    height: 230,
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#ffffffff",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#10f108ff",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 18,
    color: "#555",
    textAlign: "left",
    lineHeight: 25,
  },
  infoSection: {
    paddingVertical: 10,
    textAlign: "left",
  },
});
