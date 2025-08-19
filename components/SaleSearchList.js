import { FlatList, StyleSheet, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ItemImageCarousel } from "./SalesCarousel";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const highlightMatch = (text, searchTerm, style) => {
  if (!searchTerm) return <Text style={style}>{text}</Text>;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);

  return (
    <Text style={style}>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <Text key={index} style={[style, styles.highlight]}>
            {part}
          </Text>
        ) : (
          <Text key={index} style={style}>
            {part}
          </Text>
        )
      )}
    </Text>
  );
};

const SaleSearchList = ({ salesData, searchTerm }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <ItemImageCarousel item={item} />
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        {highlightMatch(
          item.description,
          searchTerm,
          styles.productDescription
        )}
        {highlightMatch(`Code: ${item.code}`, searchTerm, styles.productCode)}
        <Text style={styles.productPrice}>
          KES. {item.price.toLocaleString()}
        </Text>
        {highlightMatch(
          `Color: ${item.colour}`,
          searchTerm,
          styles.productInfo
        )}
        {highlightMatch(
          `Item No: ${item.pnumber}`,
          searchTerm,
          styles.productInfo
        )}
        {highlightMatch(
          `Date of Sale: ${new Date(item?.datesold).toLocaleDateString(
            "en-GB",
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }
          )}`,
          searchTerm,
          styles.productInfo
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFlatList
        data={salesData}
        keyExtractor={(item) => item?._id.$oid}
        scrollEnabled={false}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1bcadad5",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  imageContainer: {
    flex: 0.55,
    marginRight: 12,
  },
  detailsContainer: {
    flex: 0.55,
    justifyContent: "center",
  },
  productDescription: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  productCode: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0c6917ff",
    marginBottom: 4,
  },
  productInfo: {
    fontSize: 16,
    color: "#777",
  },
  highlight: {
    backgroundColor: "yellow",
  },
});

export default SaleSearchList;
