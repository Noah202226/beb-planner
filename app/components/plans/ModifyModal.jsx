import { StyleSheet, Text } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import usePlanStore from "../../store/usePlanStore";

const ModifyModal = ({ eventId, eventName, modalvisible, setModalVisible }) => {
  const deleteEvent = usePlanStore((state) => state.deletePlan);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  };
  const hideModal = () => setModalVisible(false);
  return (
    <Portal>
      <Modal
        visible={modalvisible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          Are you sure to delete this event?
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
          Event: {eventName}
        </Text>

        <Button
          mode="contained"
          buttonColor="red"
          textColor="#ececec"
          onPress={() =>
            deleteEvent(eventId).then(() => {
              setModalVisible(false);
            })
          }
          style={{ marginBottom: 10 }}
        >
          Delete Event
        </Button>
        <Text
          style={{
            fontSize: 14,
            fontStyle: "italic",
            textAlign: "center",
            marginVertical: 5,
          }}
        >
          This action cannot be undone.
        </Text>
      </Modal>
    </Portal>
  );
};

export default ModifyModal;

const styles = StyleSheet.create({});
