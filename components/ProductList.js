import React from "react";
import { View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const ProductList = ({ productData }) => {
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View>
      <Animated.FlatList
        data={productData}
        keyExtractor={(item) => item?._id}
        vertical
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />
    </View>
  );
};

export default ProductList;
