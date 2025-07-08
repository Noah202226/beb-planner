import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Avatar, Card, Modal, TextInput } from "react-native-paper";

import formatDateAndTime from "../../utils/formatDateAndTime";
import Picker from "../Picker";
import AddJournalFAB from "./AddJournalFAB";

import useJournalStore from "../../store/useJournalStore";

const JournalList = () => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="file" />;
  const journals = useJournalStore((state) => state.journals);
  const modalVisible = useJournalStore((state) => state.modalVisible);
  const setModalVisible = useJournalStore((state) => state.setModalVisible);

  const [journalTitle, setJournalTitle] = useState("");
  const [journalPurpose, setJournalPurpose] = useState("");
  const [selectedDateOnPicker, setSelectedDateOnPicker] = useState(new Date());

  const saveJournal = () => {
    if (journalTitle.trim() === "" || journalPurpose.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }
    const newJournal = {
      journalName: journalTitle,
      journalPurpose: journalPurpose,
      createdAt: new Date().toISOString(),
    };
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>TransactionList</Text>

      <FlashList
        estimatedItemSize={100}
        data={journals}
        keyExtractor={(item) => item.$id || item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("Show ID: ", item.$id || item.id);
            }}
          >
            <Card
              style={{
                backgroundColor:
                  item.transactionType == "expense" ? "#FFCCCB" : "90EE90",
                marginBottom: 10,
              }}
            >
              <Card.Title
                titleStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color:
                    item.transactionType == "expense" ? "#FFCCCB" : "#90EE90",
                }}
                subtitleStyle={{
                  color: item.priority == "expense" ? "white" : "black",
                }}
                title={
                  <View>
                    <Text>{item.journalName}</Text>
                    <Text>{item.journalDetails}</Text>
                  </View>
                }
                subtitle={formatDateAndTime(item.createdAt)}
                left={LeftContent}
              />
            </Card>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Task!</Text>

            <TextInput
              style={{ marginBottom: 10, backgroundColor: "#fff" }}
              placeholder="Journal name..."
              placeholderTextColor="#aaa"
              value={journalTitle}
              onChangeText={(e) => setJournalTitle(e)}
              mode="outlined"
              textColor="black"
            />

            <TextInput
              style={{
                marginBottom: 10,
                backgroundColor: "#fff",
                height: 80,
              }}
              textColor="black"
              placeholder="Enter task purpose..."
              placeholderTextColor="#aaa"
              value={journalPurpose}
              onChangeText={(e) => setJournalPurpose(e)}
              mode="outlined"
              multiline
              numberOfLines={3}
            />

            <Picker
              selectedDateOnPicker={selectedDateOnPicker}
              setSelectedDateOnPicker={setSelectedDateOnPicker}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={saveJournal}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <AddJournalFAB />
    </View>
  );
};

export default JournalList;

const styles = StyleSheet.create({});
