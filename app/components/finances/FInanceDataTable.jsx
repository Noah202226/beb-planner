import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";

const FInanceDataTable = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 50]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
      date: new Date(),
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 6,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 7,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 8,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 9,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 10,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
    {
      key: 11,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View>
      <DataTable style={{ backgroundColor: "black" }}>
        <DataTable.Header>
          <DataTable.Title>Transaction Name</DataTable.Title>
          <DataTable.Title numeric>Type</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
          <DataTable.Title numeric>Date</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
            <DataTable.Cell numeric>
              {new Date(item.date).toLocaleString()}
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </View>
  );
};

export default FInanceDataTable;

const styles = StyleSheet.create({});
