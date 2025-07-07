import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

import AddEventModal from "./AddEventModal";
import ModifyModal from "./ModifyModal";

export default function CalendarWithAgenda({ newEVents }) {
  const [visible, setVisible] = useState(false);

  const [eventId, setEventId] = useState(null);
  const [eventName, setEventName] = useState("");
  const [modifyModalVisible, setModifyModalVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );

  // const events = {
  //   "2025-01-15": [
  //     { name: "Team Meeting", time: "9:00 AM", id: 1 },
  //     { name: "Project Review", time: "2:00 PM", id: 2 },
  //   ],
  //   "2025-01-16": [{ name: "Client Call", time: "10:00 AM", id: 3 }],
  //   "2025-01-17": [{ name: "Planning Session", time: "11:00 AM", id: 4 }],
  //   "2025-08-24": [{ name: "BEB Birthday", time: "3:00 PM", id: 5 }],
  // };

  const markedDates = {};
  Object.keys(newEVents).forEach((date) => {
    markedDates[date] = {
      marked: true,
      dotColor: "#00adf5",
      selected: date === selectedDate,
      selectedColor: "#00adf5",
    };
  });

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderEvents = () => {
    let dayEvents = [];

    if (selectedDate && newEVents[selectedDate]) {
      // If there's a selected date, show only its events
      dayEvents = newEVents[selectedDate];
    } else {
      // flatten to get all events
      Object.keys(newEVents).forEach((date) => {
        newEVents[date].forEach((event) => {
          dayEvents.push({
            ...event,
            date,
          });
        });
      });

      console.log("All events", dayEvents);

      // sort by nearest date-time
      dayEvents.sort(
        (a, b) => new Date(a.fullDateTime) - new Date(b.fullDateTime)
      );

      console.log("Sorted events", dayEvents);
    }

    if (dayEvents.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No events found</Text>
        </View>
      );
    }

    return dayEvents.map(
      (event) => (
        console.log(event),
        (
          <TouchableOpacity
            key={event.id}
            style={styles.eventItem}
            onPress={() => {
              console.log(
                `Event clicked: ${event.name} at ${event.id} ${event.planDate}`
              );
              setEventId(event.id);
              setEventName(event.name);
              setModifyModalVisible(true);
            }}
          >
            <Text style={styles.eventTime}>{event.planDate}</Text>
            <Text style={styles.eventName}>{event.name}</Text>
          </TouchableOpacity>
        )
      )
    );
  };

  console.log("newEVents", newEVents);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar with Events</Text>

      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
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
        }}
      />

      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>
          {selectedDate && newEVents[selectedDate]
            ? `Events for ${selectedDate}`
            : "All Events"}
        </Text>

        <ScrollView
          style={styles.eventsList}
          showsVerticalScrollIndicator={false}
        >
          {renderEvents()}
        </ScrollView>
      </View>

      <AddEventModal
        visible={visible}
        setVisible={setVisible}
        selectedDate={selectedDate}
      />

      <ModifyModal
        eventId={eventId}
        eventName={eventName}
        modalvisible={modifyModalVisible}
        setModalVisible={setModifyModalVisible}
      />
    </View>
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
  eventsContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 10,
    padding: 20,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2d4150",
  },
  eventsList: {
    flex: 1,
  },
  eventItem: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#00adf5",
  },
  eventTime: {
    fontSize: 14,
    color: "#00adf5",
    fontWeight: "bold",
    marginRight: 15,
    minWidth: 70,
  },
  eventName: {
    fontSize: 16,
    color: "#2d4150",
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
