import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function MultiSelectCalendar() {
  const [selectedDates, setSelectedDates] = useState({});

  const onDayPress = (day) => {
    const dateString = day.dateString;
    const updatedDates = { ...selectedDates };

    if (updatedDates[dateString]) {
      // Date is already selected, remove it
      delete updatedDates[dateString];
    } else {
      // Date is not selected, add it
      updatedDates[dateString] = {
        selected: true,
        selectedColor: "#00adf5",
        selectedTextColor: "#ffffff",
      };
    }

    setSelectedDates(updatedDates);
  };

  const clearSelection = () => {
    setSelectedDates({});
  };

  const getSelectedDatesArray = () => {
    return Object.keys(selectedDates).sort();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Multi-Select Calendar</Text>
      <Text style={styles.subtitle}>Tap dates to select/deselect</Text>

      <Calendar
        onDayPress={onDayPress}
        markedDates={selectedDates}
        markingType="simple"
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          arrowColor: "orange",
          monthTextColor: "blue",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
        }}
      />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
          <Text style={styles.clearButtonText}>Clear Selection</Text>
        </TouchableOpacity>

        <Text style={styles.countText}>
          Selected: {getSelectedDatesArray().length} dates
        </Text>
      </View>

      {getSelectedDatesArray().length > 0 && (
        <View style={styles.selectedDatesContainer}>
          <Text style={styles.selectedDatesTitle}>Selected Dates:</Text>
          {getSelectedDatesArray().map((date, index) => (
            <TouchableOpacity
              key={date}
              style={styles.selectedDateItem}
              onPress={() => onDayPress({ dateString: date })}
            >
              <Text style={styles.selectedDateText}>{date}</Text>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    paddingBottom: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  countText: {
    fontSize: 16,
    color: "#2d4150",
    fontWeight: "bold",
  },
  selectedDatesContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedDatesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2d4150",
  },
  selectedDateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    marginBottom: 5,
    borderLeftWidth: 4,
    borderLeftColor: "#00adf5",
  },
  selectedDateText: {
    fontSize: 16,
    color: "#2d4150",
  },
  removeText: {
    fontSize: 16,
    color: "#ff4444",
    fontWeight: "bold",
  },
});
