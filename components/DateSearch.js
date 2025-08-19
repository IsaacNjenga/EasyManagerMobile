import React from "react";
import { Text } from "react-native";
import SaleSearchList from "./SaleSearchList";

const DateSearch = ({ dataSource, search }) => {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredData = dataSource.filter((item) => {
    if (!item.datesold) return false;

    const dateStr = new Date(item.datesold).toISOString().toLowerCase();

    return dateStr.includes(normalizedSearch);
  });

  return (
    <>
      {search && (
        <Text
          style={{
            marginVertical: 10,
            padding: 5,
            fontSize: 30,
            textAlign: "left",
          }}
        >
          Results for '{search}'
        </Text>
      )}
      {search ? (
        <SaleSearchList salesData={filteredData} searchTerm={search} />
      ) : null}
    </>
  );
};

export default DateSearch;
