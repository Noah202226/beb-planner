import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarWithEvents() {
  const [selected, setSelected] = useState("");

  // Sample events data
  const events = {
    "2024-12-25": { marked: true, dotColor: "red", events: ["Christmas Day"] },
    "2024-12-31": {
      marked: true,
      dotColor: "blue",
      events: ["New Year's Eve"],
    },
    "2025-01-01": {
      marked: true,
      dotColor: "green",
      events: ["New Year's Day"],
    },
    "2025-01-15": {
      marked: true,
      dotColor: "orange",
      events: ["Meeting with Client", "Lunch with Team"],
    },
    "2025-02-14": {
      marked: true,
      dotColor: "pink",
      events: ["Valentine's Day"],
    },
    "2025-07-11": {
      marked: true,
      dotColor: "pink",
      events: ["Papa Gary Bday"],
    },
    "2025-08-24": {
      marked: true,
      dotColor: "red",
      events: ["My Beb Bday"],
    },
  };

  // Prepare marked dates for calendar
  const markedDates = {
    ...events,
    [selected]: {
      ...events[selected],
      selected: true,
      selectedColor: "#00adf5",
    },
  };

  const onDayPress = (day) => {
    setSelected(day.dateString);
  };

  const renderEvents = () => {
    if (!selected || !events[selected]) return null;

    return (
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>Events for {selected}:</Text>
        {events[selected].events.map((event, index) => (
          <Text key={index} style={styles.eventItem}>
            • {event}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Calendar with Events</Text>

      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType="dot"
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          monthTextColor: "blue",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
        }}
      />

      {renderEvents()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  eventsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2d4150",
  },
  eventItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
});
