import { Divider } from "@ui-kitten/components";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import Formatter from "./Formatter";
import { ItemImageCarousel } from "./SalesCarousel";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SalesList = ({
  sortedDates,
  groupedSales,
  totalCommissions,
  totalAmount,
}) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <ItemImageCarousel item={item} />
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productDescription}>{item?.description}</Text>
        <Text style={styles.productCode}>Code: {item?.code}</Text>
        <Text style={styles.productInfo}>
          Price per unit: KES. {item?.price.toLocaleString()}
        </Text>
        <Text style={styles.productInfo}>Qty: {item.quantity}</Text>
        <Text style={styles.productInfo}>Color: {item?.colour}</Text>
        <Text style={styles.productInfo}>Item No: {item?.pnumber}</Text>
        <View style={{ marginTop: 5 }}>
          <Divider style={{ backgroundColor: "#b1acacff", height: 1 }} />
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
          <View>
            <Text style={{ ...styles.productPrice, fontSize: 25 }}>
              Total: KES.{" "}
            </Text>
          </View>
          <View>
            <Formatter
              value={item?.total}
              fontSize={25}
              fontColor={"#0a8744"}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {sortedDates.map((date) => (
        <>
          <View key={date} style={styles.section}>
            <Text style={styles.dateHeader}>
              {new Date(date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>

            {/* Totals */}
            <View style={styles.totalsBox}>
              <Text style={styles.totalText}>
                Total Amount: <Text style={styles.totalHighlight}>KES.</Text>
                <Formatter
                  value={totalAmount[date]}
                  fontSize={20}
                  fontColor={"#0aa30aff"}
                />
              </Text>
              <Text style={styles.totalText}>
                Commission: <Text style={styles.commissionHighlight}>KES.</Text>
                <Formatter
                  value={totalCommissions[date]}
                  fontSize={20}
                  fontColor={"#e30808ff"}
                />
              </Text>
            </View>

            {/* Sales List */}
            <AnimatedFlatList
              data={groupedSales[date]}
              keyExtractor={(item) => item?._id.$oid}
              renderItem={renderItem}
              contentContainerStyle={{ paddingVertical: 5 }}
              itemLayoutAnimation={LinearTransition}
              keyboardDismissMode="on-drag"
            />
          </View>
          <Divider style={{ backgroundColor: "#333", height: 1 }} />
        </>
      ))}
    </View>
  );
};

export default SalesList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7", paddingHorizontal: 12 },
  section: {
    marginVertical: 18,
    backgroundColor: "#68b1b7ff",
    padding: 10,
    borderRadius: 12,
  },
  dateHeader: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 5,
    color: "#ffffffff",
    textAlign: "center",
    lineHeight: 40,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 14,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  imageContainer: { flex: 0.5, marginRight: 12 },
  detailsContainer: { flex: 0.55, justifyContent: "center" },
  productDescription: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 4,
    color: "#222",
  },
  productCode: { fontSize: 14, color: "#666", marginBottom: 2 },
  productPrice: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0a8744",
    marginBottom: 6,
  },
  productInfo: { fontSize: 14, color: "#777" },
  totalsBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  totalText: { fontSize: 15, color: "#444", marginBottom: 4 },
  totalHighlight: { fontWeight: "bold", color: "#0aa30aff" },
  commissionHighlight: { fontWeight: "bold", color: "#e30808ff" },
});
