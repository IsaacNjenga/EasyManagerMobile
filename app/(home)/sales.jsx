import { salesData } from "@/assets/data/realData";
import SalesList from "@/components/SalesList";
import React from "react";
import { ScrollView, View } from "react-native";

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
    <ScrollView>
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
