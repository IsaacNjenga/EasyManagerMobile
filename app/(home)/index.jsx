import { expenseData, salesData } from "@/assets/data/realData";
import CustomSpinner from "@/components/CustomSpinner";
import { getDashboardData } from "@/components/DashboardData";
import Formatter from "@/components/Formatter";
import SalesCarousel from "@/components/SalesCarousel";
import { useAuthStore } from "@/providers/AuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Card } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const NumbersDetails = ({
  expensesDisplay,
  commissionsDisplay,
  profitDisplay,
}) => {
  const numbersDetails = [
    {
      id: 1,
      title: "Profits",
      value: profitDisplay(),
      icon: "trending-up-sharp",
      iconColor: "#057f00",
    },
    {
      id: 2,
      title: "Expenses",
      value: expensesDisplay(),
      icon: "card-outline",
      iconColor: "#fd0000",
    },
    {
      id: 3,
      title: "Commissions",
      value: commissionsDisplay(),
      icon: "person-remove-outline",
      iconColor: "#ffa809",
    },
  ];

  return (
    <>
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ ...styles.cardText, color: detail.iconColor }}>
              KES.{" "}
            </Text>
            <Formatter
              value={detail.value}
              fontColor={detail.iconColor}
              fontSize={35}
            />
          </View>
        </Card>
      ))}
    </>
  );
};

const ButtonGroup = ({
  setShow,
  setSelectedCommission,
  setSelectedExpense,
  setSelectedPeriod,
  setSelectedProfit,
  setSelectedRevenue,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={styles.cardScrollContent}
    >
      <Button
        style={{ backgroundColor: "#0434f5ff", ...styles.buttonGroup }}
        appearance="filled"
        onPress={() => {
          setShow(true);
        }}
      >
        Select a date
      </Button>
      <Button
        style={{ backgroundColor: "#008001", ...styles.buttonGroup }}
        appearance="filled"
        onPress={() => {
          setSelectedPeriod("today");
          setSelectedRevenue("today");
          setSelectedExpense("today");
          setSelectedCommission("today");
          setSelectedProfit("today");
        }}
      >
        Today
      </Button>
      <Button
        style={{ backgroundColor: "#4676c2", ...styles.buttonGroup }}
        appearance="filled"
        onPress={() => {
          setSelectedPeriod("yesterday");
          setSelectedRevenue("yesterday");
          setSelectedExpense("yesterday");
          setSelectedCommission("yesterday");
          setSelectedProfit("yesterday");
        }}
      >
        Yesterday
      </Button>
      <Button
        style={{ backgroundColor: "#f0b21a", ...styles.buttonGroup }}
        appearance="filled"
        onPress={() => {
          setSelectedPeriod("lastWeek");
          setSelectedRevenue("lastWeek");
          setSelectedExpense("lastWeek");
          setSelectedCommission("lastWeek");
          setSelectedProfit("lastWeek");
        }}
      >
        Last 7 days
      </Button>
      <Button
        style={{ backgroundColor: "#fb0102", ...styles.buttonGroup }}
        appearance="filled"
        onPress={() => {
          setSelectedPeriod("lastMonth");
          setSelectedRevenue("lastMonth");
          setSelectedExpense("lastMonth");
          setSelectedCommission("lastMonth");
          setSelectedProfit("lastMonth");
        }}
      >
        Last 30 days
      </Button>
    </ScrollView>
  );
};

const HomeScreen = () => {
  const { logout } = useAuthStore();
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedRevenue, setSelectedRevenue] = useState("today");
  const [selectedProfit, setSelectedProfit] = useState("today");
  const [selectedExpense, setSelectedExpense] = useState("today");
  const [selectedCommission, setSelectedCommission] = useState("today");
  const [day, setDay] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [filteredSales, setFilteredSales] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [show, setShow] = useState(false);
  const currentDateTime = new Date();

  const dashboardData = getDashboardData({ salesData, expenseData, day });

  const onDateChange = (date) => {
    const formatted = date.toISOString().split("T")[0]; // yyyy-MM-dd
    setSelectedPeriod("randomDay");
    setSelectedRevenue("randomDay");
    setSelectedExpense("randomDay");
    setSelectedCommission("randomDay");
    setSelectedProfit("randomDay");
    setDate(date);
    setDay(formatted);
  };

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

  if (loading) {
    return <CustomSpinner loading={loading} text={"Loading"} />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Button onPress={logout} style={styles.logoutBtn}>
            Log out
          </Button>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Revenue Card */}
          <LinearGradient
            colors={["#1e7ca4ff", "#44944cff", "#0c6d11ff"]}
            style={styles.statCard}
          >
            <Text style={styles.label}>Revenue</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.value}>KES. </Text>
              <Formatter
                value={revenueDisplay()}
                fontColor={"white"}
                fontSize={35}
              />
            </View>
          </LinearGradient>

          {/* Sales Card */}
          <LinearGradient
            colors={["#1e7ca4ff", "#44944cab", "#0c6d11e7"]}
            style={styles.statCard}
          >
            <Text style={styles.label}>Sales Made</Text>
            <Formatter value={1100} />
          </LinearGradient>
        </View>
      </View>

      {/* Cards - Overlapping */}
      <View style={styles.cardsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.cardScrollContent}
        >
          <NumbersDetails
            expensesDisplay={expensesDisplay}
            commissionsDisplay={commissionsDisplay}
            profitDisplay={profitDisplay}
          />
        </ScrollView>
      </View>

      {/* datepicker */}
      <View style={styles.datePicker}>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShow(false); // close the picker
              if (selectedDate) {
                onDateChange(selectedDate); // pass the actual picked date
              }
            }}
          />
        )}
      </View>

      {/* buttons for the period selection */}
      <ButtonGroup
        setShow={setShow}
        setSelectedCommission={setSelectedCommission}
        setSelectedExpense={setSelectedExpense}
        setSelectedPeriod={setSelectedPeriod}
        setSelectedProfit={setSelectedProfit}
        setSelectedRevenue={setSelectedRevenue}
      />

      <View>
        <Text style={styles.salesHeader}>
          Sales{" "}
          {selectedPeriod === "lastWeek"
            ? "for the last 7 days"
            : selectedPeriod === "lastMonth"
            ? "for the last 30 days"
            : selectedPeriod === "yesterday"
            ? " yesterday"
            : day
            ? `for ${day}`
            : selectedPeriod}
          :
        </Text>

        <SalesCarousel salesDetails={filteredSales} />
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
    paddingBottom: 40,
    paddingTop: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  label: {
    fontSize: 20,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 4,
    fontWeight: "400",
  },
  value: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },

  // Wrapper to create overlap
  cardsWrapper: {
    marginTop: -50, // pull cards upward
  },
  cardScrollContent: {
    paddingHorizontal: 15,
    gap: 20,
    marginVertical: 5,
  },
  card: {
    borderRadius: 18,
    padding: 0,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 15,
    marginVertical: 20,
    marginBottom: 4,
  },
  cardTitle: { fontSize: 30, fontWeight: "600", lineHeight: 30 },
  cardText: { fontSize: 20, fontWeight: "bold" },
  salesHeader: { fontSize: 30, marginHorizontal: 20, lineHeight: 40 },
  buttonGroup: { borderColor: "rgba(0,0,0,0)", marginBottom: 5 },
  datePicker: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  datePickerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
