import { useState } from "react";

import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

export default function AppointmentsScreen() {
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    if (!patientName || !doctor || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patientName,
      doctor,
      date,
      time,
    };

    setAppointments([newAppointment, ...appointments]);

    setPatientName("");
    setDoctor("");
    setDate("");
    setTime("");

    alert("Appointment Booked Successfully ✅");
  };

  const handleDelete = (id) => {
    const updatedAppointments = appointments.filter(
      (item) => item.id !== id
    );

    setAppointments(updatedAppointments);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Booking Card */}

      <View style={styles.card}>
        <Text style={styles.title}>📅 Book Appointment</Text>

        {/* Patient Name */}

        <TextInput
          placeholder="Patient Name"
          style={styles.input}
          value={patientName}
          onChangeText={setPatientName}
        />

        {/* Doctor Select Option */}

        <View style={styles.dropdown}>
          <Picker
            selectedValue={doctor}
            onValueChange={(itemValue) => setDoctor(itemValue)}
          >
            <Picker.Item label="Select Doctor" value="" />

            <Picker.Item label="Dr.Prathmesh Joshi " value="Dr. Prathmesh Joshi" />

            <Picker.Item label="Dr. Akash Patil" value="Dr. Akash Patil" />

            <Picker.Item label="Dr. Sanjay Kulkarni" value="Dr. Sanjay Kulkarni" />

            <Picker.Item label="Dr. Priya Sharma" value="Dr. Priya Sharma" />

            {/* <Picker.Item label="Dr. Kulkarni" value="Dr. Kulkarni" /> */}
          </Picker>
        </View>

        {/* Date */}

        <TextInput
          placeholder="Date (DD/MM/YYYY)"
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />

        {/* Time */}

        <TextInput
          placeholder="Time (10:30 AM)"
          style={styles.input}
          value={time}
          onChangeText={setTime}
        />

        {/* Button */}

        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Book Appointment 🚀</Text>
        </TouchableOpacity>
      </View>

      {/* Appointment List */}

      <Text style={styles.sectionTitle}>Booked Appointments</Text>

      {appointments.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No Appointments Yet</Text>
        </View>
      ) : (
        appointments.map((item) => (
          <View key={item.id} style={styles.appointmentCard}>
            <Text style={styles.patientName}>
              👤 {item.patientName}
            </Text>

            <Text style={styles.info}>
              👨‍⚕️ {item.doctor}
            </Text>

            <Text style={styles.info}>
              📅 {item.date}
            </Text>

            <Text style={styles.info}>
              🕒 {item.time}
            </Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f1f5f9",
    flexGrow: 1,
    alignItems: "center",
  },

  card: {
    width: Platform.OS === "web" ? 500 : "100%",
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#065f46",
  },

  input: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  dropdown: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
  },

  button: {
    backgroundColor: "#065f46",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 35,
    marginBottom: 20,
    color: "#1f2937",
  },

  appointmentCard: {
    width: Platform.OS === "web" ? 500 : "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  patientName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0f172a",
  },

  info: {
    fontSize: 16,
    marginBottom: 6,
    color: "#475569",
  },

  deleteBtn: {
    marginTop: 15,
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyCard: {
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 18,
    width: Platform.OS === "web" ? 500 : "100%",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    color: "#64748b",
  },
});
