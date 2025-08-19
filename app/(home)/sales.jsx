import { salesData } from "@/assets/data/realData";
import CustomSpinner from "@/components/CustomSpinner";
import DateSearch from "@/components/DateSearch";
import SalesList from "@/components/SalesList";
import { Input } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import bannerImg from "../../assets/images/sales_banner.jpg";
import { renderSearchIcon } from "./products";

const SalesScreen = () => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  const groupedSalesByDate = salesData.reduce((acc, sale) => {
    const date = new Date(sale.datesold).toISOString().split("T")[0];
    acc[date] = acc[date] || [];
    acc[date].push(sale);
    return acc;
  }, {});

  const totalAmountByDate = Object.keys(groupedSalesByDate).reduce(
    (acc, date) => {
      const totalForDate = groupedSalesByDate[date].reduce(
        (total, sale) => total + sale.total,
        0
      );
      acc[date] = totalForDate.toLocaleString();
      return acc;
    },
    {}
  );

  const totalCommissionByDate = Object.keys(groupedSalesByDate).reduce(
    (acc, date) => {
      const totalCommissionForDate = groupedSalesByDate[date].reduce(
        (commission, sale) => commission + sale.commission,
        0
      );
      acc[date] = totalCommissionForDate.toLocaleString();
      return acc;
    },
    {}
  );

  const groupedSalesByDateSorted = Object.keys(groupedSalesByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  if (loading)
    return (
      <CustomSpinner loading={loading} text={"Fetching sales. Just a sec"} />
    );

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={bannerImg} style={styles.bannerImage}>
        <LinearGradient
          colors={["rgba(61, 56, 56, 0.5)", "#1bcada72"]}
          style={styles.bannerOverlay}
        >
          {/* 
            <Text style={styles.bannerTitle}>Sales</Text>
            <Text style={styles.bannerSubtitle}>Find your items here</Text>
           */}
          <View>
            <Input
              status="control"
              placeholder="Search by date of sale"
              autoCapitalize="none"
              autoComplete="off"
              accessoryLeft={renderSearchIcon}
              style={styles.searchInput}
              onChangeText={(value) => {
                setSearchValue(value);
                setSearch(value);
              }}
            />
          </View>
        </LinearGradient>
      </ImageBackground>

      <DateSearch
        onSearchChange={(value) => setSearchValue(value)}
        dataSource={salesData}
        search={search}
      />
      {searchValue === "" && (
        <SalesList
          sortedDates={groupedSalesByDateSorted}
          groupedSales={groupedSalesByDate}
          totalCommissions={totalCommissionByDate}
          totalAmount={totalAmountByDate}
        />
      )}
    </ScrollView>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  bannerImage: { height: 230, width: "100%" },
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
  searchInput: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderColor: "white",
    borderWidth: 2,
  },
});
