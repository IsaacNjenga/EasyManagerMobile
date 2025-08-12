import { salesDetails } from "@/assets/data/mockData";
import { expenseData, salesData } from "@/assets/data/realData";
import { getDashboardData } from "@/components/DashboardData";
import SalesCarousel from "@/components/SalesCarousel";
import { useAuthStore } from "@/providers/AuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Card } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredSales, setFilteredSales] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const currentDateTime = new Date();

  const dashboardData = getDashboardData({ salesData, expenseData, day });

  useEffect(() => {
    setLoading(true);
    try {
      const filterByDateRange = (data, dateKey, days, specificDate = null) => {
        let startDate, endDate;
        if (specificDate) {
          startDate = new Date(specificDate);
          endDate = new Date(specificDate);
        } else {
          endDate = new Date();
          endDate.setHours(23, 59, 59, 999);

          startDate = new Date();
          startDate.setDate(endDate.getDate() - days);
        }

        if (days === 1 && !specificDate) {
          startDate.setDate(currentDateTime.getDate() - 1);
          endDate.setDate(currentDateTime.getDate() - 1);
        }

        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);

        return data.filter((item) => {
          const itemDate = new Date(item[dateKey]);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= startDate && itemDate <= endDate;
        });
      };

      let filteredSalesData = [];
      let filteredExpensesData = [];

      switch (selectedPeriod) {
        case "today":
          filteredSalesData = filterByDateRange(salesData, "datesold", 0);
          filteredExpensesData = filterByDateRange(expenseData, "date", 0);
          break;
        case "yesterday":
          filteredSalesData = filterByDateRange(salesData, "datesold", 1);
          filteredExpensesData = filterByDateRange(expenseData, "date", 1);
          break;
        case "lastWeek":
          filteredSalesData = filterByDateRange(salesData, "datesold", 7);
          filteredExpensesData = filterByDateRange(expenseData, "date", 7);
          break;
        case "lastMonth":
          filteredSalesData = filterByDateRange(salesData, "datesold", 30);
          filteredExpensesData = filterByDateRange(expenseData, "date", 30);
          break;
        case "randomDay":
          filteredSalesData = filterByDateRange(salesData, "datesold", 0, date);
          filteredExpensesData = filterByDateRange(
            expenseData,
            "date",
            0,
            date
          );
          break;
        default:
          filteredSalesData = filterByDateRange(salesData, "datesold", 0);
          filteredExpensesData = filterByDateRange(expenseData, "date", 0);
      }

      setFilteredSales(filteredSalesData);
      setFilteredExpenses(filteredExpensesData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod, salesData, expenseData, date]);

  const revenueMap = {
    today: dashboardData.revenueToday,
    yesterday: dashboardData.revenueYesterday,
    lastWeek: dashboardData.revenueWeekly,
    lastMonth: dashboardData.revenueMonthly,
    randomDay: dashboardData.selectedDateRevenue,
  };

  const expensesMap = {
    today: dashboardData.expenseToday,
    yesterday: dashboardData.expenseYesterday,
    lastWeek: dashboardData.expenseWeekly,
    lastMonth: dashboardData.expenseMonthly,
    randomDay: dashboardData.selectedDateExpense,
  };

  const profitMap = {
    today: dashboardData.profitToday,
    yesterday: dashboardData.profitYesterday,
    lastWeek: dashboardData.profitWeekly,
    lastMonth: dashboardData.profitMonthly,
    randomDay: dashboardData.selectedDateProfit,
  };

  const commissionsMap = {
    today: dashboardData.commissionsToday,
    yesterday: dashboardData.commissionsYesterday,
    lastWeek: dashboardData.commissionsWeekly,
    lastMonth: dashboardData.commissionsMonthly,
    randomDay: dashboardData.selectedDateCommissions,
  };

  const revenueDisplay = () =>
    revenueMap[selectedRevenue] ?? dashboardData.revenueToday;
  const expensesDisplay = () =>
    expensesMap[selectedExpense] ?? dashboardData.expenseToday;
  const commissionsDisplay = () =>
    commissionsMap[selectedCommission] ?? dashboardData.commissionsToday;
  const profitDisplay = () =>
    profitMap[selectedProfit] ?? dashboardData.profitToday;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Button onPress={logout} style={styles.logoutBtn}>
            Log out
          </Button>
        </View>

        <Card style={styles.header}>
          <Text style={styles.headerTextPrimary}>Revenue</Text>
          <Text style={styles.headerTextSecondary}>KES. 45,000</Text>
        </Card>
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.cardScrollContent}
      >
        <Button
          style={{ backgroundColor: "#008001", ...styles.buttonGroup }}
          appearance="filled"
          onPress={() => {
            setSelectedPeriod("today");
          }}
        >
          Today
        </Button>
        <Button
          style={{ backgroundColor: "#4676c2", ...styles.buttonGroup }}
          appearance="filled"
          onPress={() => {
            setSelectedPeriod("yesterday");
          }}
        >
          Yesterday
        </Button>
        <Button
          style={{ backgroundColor: "#f0b21a", ...styles.buttonGroup }}
          appearance="filled"
          onPress={() => {
            setSelectedPeriod("lastWeek");
          }}
        >
          Last 7 days
        </Button>
        <Button
          style={{ backgroundColor: "#fb0102", ...styles.buttonGroup }}
          appearance="filled"
          onPress={() => {
            setSelectedPeriod("lastMonth");
          }}
        >
          Last 30 days
        </Button>
      </ScrollView>

      <View>
        <Text style={styles.salesHeader}>
          Sales{" "}
          {selectedPeriod === "lastWeek"
            ? "for the last 7 days"
            : selectedPeriod === "lastMonth"
            ? "for the last 30 days"
            : day
            ? `for ${day}`
            : selectedPeriod}
          :
        </Text>
        <SalesCarousel salesDetails={salesDetails} />
      </View>
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
    paddingHorizontal: 10,
    paddingBottom: 70,
    paddingTop: 20,
  },
  header: {
    backgroundColor: "rgba(254, 254, 254, 0)",
    paddingVertical: 5,
    borderRadius: 18,
    width: 250,
    marginHorizontal: 5,
    borderColor: "#ffffff",
  },
  headerTextPrimary: {
    color: "whitesmoke",
    fontSize: 25,
    fontWeight: "400",
    lineHeight: 50,
    color: "rgba(49, 255, 8, 1)",
  },
  headerTextSecondary: {
    color: "whitesmoke",
    fontSize: 40,
    fontWeight: "bold",
    color: "rgba(49, 255, 8, 1)",
  },

  // Wrapper to create overlap
  cardsWrapper: {
    marginTop: -50, // pull cards upward
  },
  cardScrollContent: {
    paddingHorizontal: 15,
    gap: 20,
    marginVertical: 10,
  },
  card: {
    borderRadius: 18,
    padding: 5,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
    marginVertical: 20,
  },
  cardTitle: { fontSize: 30, fontWeight: "600", lineHeight: 40 },
  cardText: { fontSize: 24, fontWeight: "bold" },
  salesHeader: { fontSize: 30, marginHorizontal: 20, lineHeight: 40 },

  buttonGroup: { borderColor: "rgba(0,0,0,0)" },
});
