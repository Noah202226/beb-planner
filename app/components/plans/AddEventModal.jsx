import { StyleSheet, Text } from "react-native";

import { useState } from "react";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import usePlanStore from "../../store/usePlanStore";
import useTaskStore from "../../store/useTaskStore";
import Picker from "../Picker";
import AddEventFAB from "./AddEventFAB";

const AddEventModal = () => {
  const visibleAddModal = usePlanStore((state) => state.visibleAddModal);
  const setVisibleAddModal = usePlanStore((state) => state.setVisibleAddModal);
  const addPlan = usePlanStore((state) => state.addPlan);

  const [eventName, setEventName] = useState("");
  const [selectedDateOnPicker, setSelectedDateOnPicker] = useState(new Date());

  const authUser = useTaskStore((state) => state.authUser);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  };

  const saveEvent = () => {
    const newEvent = {
      planName: eventName,
      planDate: selectedDateOnPicker,
      createdAt: new Date(),
      createdBy: authUser.name,
    };

    console.log("Saving event:", newEvent);

    addPlan(newEvent);

    setVisibleAddModal(false);
    setEventName("");
  };
  return (
    <>
      <Portal>
        <Modal
          visible={visibleAddModal}
          //   onDismiss={() => setVisibleAddModal(false)}
          contentContainerStyle={containerStyle}
        >
          <Text>ADD NEW EVENT</Text>
          <Text>Event Name</Text>
          <TextInput
            mode="contained"
            placeholder="Enter event name"
            style={{ marginBottom: 10 }}
            value={eventName}
            onChangeText={(text) => setEventName(text)}
          />
          <TextInput
            mode="contained"
            placeholder="Event Details"
            style={{ marginBottom: 10 }}
          />
          <Picker
            selectedDateOnPicker={selectedDateOnPicker}
            setSelectedDateOnPicker={setSelectedDateOnPicker}
          />

          <Button
            mode="contained"
            style={{ marginBottom: 10 }}
            onPress={() => saveEvent()}
          >
            Save Event
          </Button>

          <Button
            buttonColor="#722323"
            mode="outlined"
            onPress={() => setVisibleAddModal(false)}
          >
            Close
          </Button>
        </Modal>
      </Portal>
      <AddEventFAB />
    </>
  );
};

export default AddEventModal;

const styles = StyleSheet.create({});
