function AppointmentForm({
  patientId,
  setPatientId,
  patientName,
  setPatientName,
  diagnosis,
  setDiagnosis,
  conditions,
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  bookAppointment,
  appointmentTime,
  setAppointmentTime,
  timeSlots,
}) {
  return (
    <div>
      <h2>Book Appointment</h2>

      <div className="form-box">
        <input type="text" placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />

        <input type="text" placeholder="Enter Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />

        <select value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}>
          <option value="">Select Condition</option>
          {conditions.map((condition) => (
            <option key={condition} value={condition}>{condition}</option>
          ))}
        </select>

        <select
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
        >
          <option value="">
            Select Preferred Time
          </option>

          {timeSlots.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <select value={selectedDoctor.id} onChange={(e) => {
          const doctor = doctors.find((doc) => doc.id === e.target.value);
          setSelectedDoctor(doctor);
        }}>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialization}
            </option>
          ))}
        </select>

        <button onClick={bookAppointment}>Book Appointment</button>
      </div>

      <hr />
    </div>
  );
}

export default AppointmentForm;