import { Card } from "@ui-kitten/components";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const SalesCarousel = ({ salesDetails }) => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.productName}>{item.product}</Text>
      <Text style={styles.detailText}>Code: {item.code}</Text>
      <Text style={styles.detailText}>Colour: {item.colour}</Text>
      <Text style={styles.price}>KES. {item.price.toLocaleString()}</Text>
      <Text style={styles.detailText}>Qty: {item.quantity}</Text>
      <Text style={styles.detailText}>
        Commission: KES. {item.commission.toLocaleString()}
      </Text>
      <Text style={styles.detailText}>Salesperson: {item.salesperson}</Text>
      <Text style={styles.detailText}>Date: {item.date}</Text>
    </Card>
  );

  return (
    <View
      style={{
        paddingVertical: 20,
        backgroundColor: "whitesmoke",
      }}
    >
      <FlatList
        data={salesDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        snapToInterval={260} // width of card + margin
        decelerationRate="fast"
      />
    </View>
  );
};

export default SalesCarousel;

const styles = StyleSheet.create({
  card: {
    width: 240,
    borderRadius: 16,
    marginRight: 10,
    padding: 15,
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
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
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
