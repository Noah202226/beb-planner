import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import useJournalStore from "../../store/useJournalStore";

const AddJournalFAB = () => {
  const setVisibleAddModal = useJournalStore(
    (state) => state.setVisibleAddModal
  );

  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={() => {
        console.log("Add Event FAB Pressed");
        setVisibleAddModal(true);
      }}
    />
  );
};

export default AddJournalFAB;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
