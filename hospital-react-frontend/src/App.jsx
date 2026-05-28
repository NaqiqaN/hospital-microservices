import { useEffect, useState } from "react";
import AppointmentList from "./components/AppointmentList";
import AppointmentForm from "./components/AppointmentForm";
import DashboardStats from "./components/DashboardStats";
import SlotTable from "./components/SlotTable";
import BillReceipt from "./components/BillReceipt";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

const doctors = [
  { id: "D01", name: "Sharma", specialization: "Cardiology", feePerHour: 500 },
  { id: "D02", name: "Mehta", specialization: "Neurology", feePerHour: 600 },
  { id: "D03", name: "Iyer", specialization: "Orthopedic", feePerHour: 450 },
  { id: "D04", name: "Khan", specialization: "Gynecology", feePerHour: 550 },
  { id: "D05", name: "Das", specialization: "Psychiatry", feePerHour: 400 },
  { id: "D06", name: "Patel", specialization: "Pediatrics", feePerHour: 350 },
  { id: "D07", name: "Rao", specialization: "General Physician", feePerHour: 250 }
];

const conditions = [
  "Fever", "Cough", "Asthma", "Anxiety", "Insomnia",
  "Arthritis", "PCOS", "Hypoglycemia", "Osteoporosis"
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM",
  "09:00 PM"
];

function App() {
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [diagnosis, setDiagnosis] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [latestBill, setLatestBill] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAppointments();
    }
  }, [isLoggedIn]);

  function fetchAppointments() {
    fetch("https://hospital-management-system-98vl.onrender.com/hospital/appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => {
        console.log("Fetch appointments error:", error);
      });
  }

  function bookAppointment() {
    if (!patientId || !patientName || !appointmentTime) {
      alert("Please fill Patient ID, Patient Name, and Time before booking.");
      return;
    }

    const bookingData = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      patientId: patientId,
      patientName: patientName,
      diagnosis: diagnosis || "General Consultation",
      feePerHour: selectedDoctor.feePerHour,
      appointmentTime: appointmentTime
    };

    fetch("https://hospital-management-system-98vl.onrender.com/hospital/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(bookingData)
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setPatientId("");
        setPatientName("");
        setDiagnosis("");
        setAppointmentTime("");
        setSelectedDoctor(doctors[0]);
        fetchAppointments();
      })
      .catch((error) => {
        console.log("Book appointment error:", error);
        alert("Booking failed");
      });
  }

  function dischargePatient(patientId) {
    const appointment = appointments.find(
      (apt) => apt.patient.id === patientId
    );

    const hours = prompt("Enter hours admitted:");

    if (!hours || !appointment) {
      return;
    }

    fetch(`https://hospital-management-system-98vl.onrender.com/hospital/discharge/${patientId}/${hours}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.text())
      .then(() => {
        setLatestBill({
          patientId: appointment.patient.id,
          patientName: appointment.patient.name,
          diagnosis: appointment.patient.diagnosis,
          doctorName: appointment.doctor.name,
          specialization: appointment.doctor.specialization,
          appointmentTime: appointment.appointmentTime,
          feePerHour: appointment.patient.feePerHour,
          hours: hours,
          appointmentNumber: appointment.appointmentNumber
        });

        fetchAppointments();
      })
      .catch((error) => {
        console.log("Discharge error:", error);
        alert("Discharge failed");
      });
  }

  function resetSystem() {
    const confirmReset = confirm(
      "This will delete all appointments and patient IDs. Continue?"
    );

    if (!confirmReset) {
      return;
    }

    fetch("https://hospital-management-system-98vl.onrender.com/hospital/appointments/clear", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((response) => response.text())
      .then(() => {
        setLatestBill(null);
        fetchAppointments();
      })
      .catch((error) => {
        console.log("Reset error:", error);
        alert("Reset failed");
      });
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setAppointments([]);
    setLatestBill(null);
  }

  if (!isLoggedIn) {
    return showRegister ? (
      <Register onShowLogin={() => setShowRegister(false)} />
    ) : (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div className="page-shell">
      <div className="dashboard-glow dashboard-glow-one" />
      <div className="dashboard-glow dashboard-glow-two" />

      <div className="app-container">
        <header className="hospital-header">
          <div>
            <p className="dashboard-label">Hospital Management Dashboard</p>
            <h1>Chiron Hospital</h1>
          </div>

          <div className="header-actions">
            <button className="reset-btn" onClick={resetSystem}>
              Reset System
            </button>

            <button className="reset-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        <DashboardStats
          appointments={appointments}
          doctors={doctors}
          timeSlots={timeSlots}
        />

        <BillReceipt
          bill={latestBill}
          onClose={() => setLatestBill(null)}
        />

        <AppointmentForm
          patientId={patientId}
          setPatientId={setPatientId}
          patientName={patientName}
          setPatientName={setPatientName}
          diagnosis={diagnosis}
          setDiagnosis={setDiagnosis}
          conditions={conditions}
          doctors={doctors}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          appointmentTime={appointmentTime}
          setAppointmentTime={setAppointmentTime}
          bookAppointment={bookAppointment}
          timeSlots={timeSlots}
        />

        <AppointmentList
          appointments={appointments}
          dischargePatient={dischargePatient}
        />

        <SlotTable appointments={appointments} doctors={doctors} />
      </div>
    </div>
  );
}

export default App;
