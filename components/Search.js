import React from "react";
import { Text } from "react-native";
import ProductList from "./ProductList";

const Search = ({ dataSource, search }) => {
  const filteredData = dataSource.filter((item) =>
    Object.values(item).some(
      (val) => typeof val === "string" && val.toLowerCase().includes(search)
    )
  );

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
        <ProductList productData={filteredData} searchTerm={search} />
      ) : null}
    </>
  );
};

export default Search;
