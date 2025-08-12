import { salesDetails } from "@/assets/data/mockData";
import SalesCarousel from "@/components/SalesCarousel";
import { useAuthStore } from "@/providers/AuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Card } from "@ui-kitten/components";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const numbersDetails = [
  {
    id: 1,
    title: "Expenses",
    amount: 4500,
    icon: "card-outline",
    iconColor: "#fd0000",
  },
  {
    id: 2,
    title: "Commissions",
    amount: 5830,
    icon: "person-remove-outline",
    iconColor: "#ffa809",
  },
  {
    id: 3,
    title: "Profits",
    amount: 45000,
    icon: "trending-up-sharp",
    iconColor: "#057f00",
  },
];

const HomeScreen = () => {
  const { logout } = useAuthStore();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Button onPress={logout} style={styles.logoutBtn}>
          Log out
        </Button>
        <Text style={styles.headerTextPrimary}>Sales Today</Text>
        <Text style={styles.headerTextSecondary}>KES. 45,000</Text>
      </View>

      {/* Cards - Overlapping */}
      <View style={styles.cardsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.cardScrollContent}
        >
          {numbersDetails.map((detail) => (
            <Card key={detail.id} style={styles.card}>
              <Text style={{ ...styles.cardTitle, color: detail.iconColor }}>
                {detail.title}
              </Text>
              <Ionicons
                name={detail.icon}
                size={55}
                color={detail.iconColor}
                style={{ marginVertical: 5 }}
              />
              <Text style={{ ...styles.cardText, color: detail.iconColor }}>
                KES. {detail.amount.toLocaleString()}
              </Text>
            </Card>
          ))}
        </ScrollView>
      </View>

      <SalesCarousel salesDetails={salesDetails} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  logoutBtn: {
    marginBottom: 15,
    alignSelf: "flex-end",
  },
  headerContainer: {
    backgroundColor: "#00152ae8",
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  headerTextPrimary: {
    color: "whitesmoke",
    fontSize: 25,
    fontWeight: "400",
    lineHeight: 50,
  },
  headerTextSecondary: {
    color: "whitesmoke",
    fontSize: 40,
    fontWeight: "bold",
  },

  // Wrapper to create overlap
  cardsWrapper: {
    marginTop: -50, // pull cards upward
  },
  cardScrollContent: {
    paddingHorizontal: 15,
    gap: 20,
  },
  card: {
    borderRadius: 18,
    padding: 5,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
    marginVertical: 20,
  },
  cardTitle: { fontSize: 30, fontWeight: "600", lineHeight: 40 },
  cardText: { fontSize: 24, fontWeight: "bold" },
});

