import { salesData } from "@/assets/data/realData";
import SalesList from "@/components/SalesList";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import bannerImg from "../../assets/images/product_banner.jpg";

const SalesScreen = () => {
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

  return (
    <ScrollView style={styles.container}>
      {/* Banner with overlay text and search */}
      <ImageBackground source={bannerImg} style={styles.bannerImage}>
        {/* <LinearGradient
          colors={["rgba(61, 56, 56, 0.5)", "#d4232380"]}
          style={styles.bannerOverlay}
        >
          <Text style={styles.bannerTitle}>Sales</Text>
          <Text style={styles.bannerSubtitle}>Find your items here</Text>
        </LinearGradient> */}
      </ImageBackground>
      <SalesList
        sortedDates={groupedSalesByDateSorted}
        groupedSales={groupedSalesByDate}
        totalCommissions={totalCommissionByDate}
        totalAmount={totalAmountByDate}
      />
    </ScrollView>
  );
};

export default SalesScreen;

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
});
