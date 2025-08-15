import { salesData } from "@/assets/data/realData";
import CustomSpinner from "@/components/CustomSpinner";
import ProductList from "@/components/ProductList";
import Search from "@/components/Search";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Input } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import bannerImg from "../../assets/images/product_banner.jpg";

const ProductScreen = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  const renderIcon = () => (
    <Ionicons name="search" size={20} color="#ffffffff" />
  );

  if (loading)
    return (
      <CustomSpinner
        loading={loading}
        text={"Fetching products. Just a sec..."}
      />
    );

  return (
    <View style={styles.container}>
      {/* Banner with overlay text and search */}
      <ImageBackground source={bannerImg} style={styles.bannerImage}>
        <LinearGradient
          colors={["rgba(61, 56, 56, 0.5)", "#d4232380"]}
          style={styles.bannerOverlay}
        >
          <Text style={styles.bannerTitle}>Products</Text>
          <Text style={styles.bannerSubtitle}>Find your items here</Text>

          {/* Search bar */}
          <View style={styles.searchContainer}>
            <Input
              status="control"
              placeholder={"Search by name or code"}
              autoCapitalize="none"
              autoComplete="off"
              onChangeText={(value) => {
                setSearchValue(value);
                setSearch(value);
              }}
              accessoryLeft={renderIcon}
              style={styles.searchInput}
            />
          </View>
        </LinearGradient>
      </ImageBackground>

      <Search
        onSearchChange={(value) => setSearchValue(value)}
        dataSource={salesData}
        search={search}
      />

      {searchValue === "" && (
        <View style={styles.innerContainer}>
          <ProductList productData={salesData} />
        </View>
      )}
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  bannerImage: { height: 220, width: "100%" },
  bannerOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  bannerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    lineHeight: 30,
  },
  bannerSubtitle: {
    fontSize: 30,
    lineHeight: 30,
    color: "#f5f5f5",
    marginBottom: 14,
  },
  searchContainer: {
    width: "100%",
  },
  searchInput: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderColor: "white",
    borderWidth: 2,
  },
  innerContainer: { flex: 1, paddingHorizontal: 0 },
});
