function AppointmentList({ appointments, dischargePatient }) {
  return (
    <div className="table-section">
      <h2>Booked Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Appointment No.</th>
              <th>Patient ID</th>
              <th>Patient</th>
              <th>Condition</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentNumber}>
                <td>{appointment.appointmentNumber}</td>
                <td>{appointment.patient.id}</td>
                <td>{appointment.patient.name}</td>
                <td>{appointment.patient.diagnosis}</td>
                <td>{appointment.doctor.name}</td>
                <td>{appointment.doctor.specialization}</td>
                <td>{appointment.appointmentTime}</td>
                <td>
                  <button
                    className="discharge-btn"
                    onClick={() => dischargePatient(appointment.patient.id)}
                  >
                    Discharge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AppointmentList;