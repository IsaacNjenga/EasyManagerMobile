import { salesData } from "@/assets/data/realData";
import ProductList from "@/components/ProductList";
import { Input } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

const ProductScreen = () => {
  return (
    <View>
      <Input />
      <ProductList productData={salesData} />
    </View>
  );
};

export default ProductScreen;
