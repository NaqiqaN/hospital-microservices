function DashboardStats({ appointments, doctors = [], timeSlots = [] }) {
  const totalAppointments = appointments.length;
  const bookedSlots = appointments.length;
  const totalSlots = doctors.length * timeSlots.length;
  const availableSlots = totalSlots - bookedSlots;

  return (
    <div className="stats-container stats-three">
      <div className="stat-card">
        <span className="stat-icon">📋</span>
        <h3>{totalAppointments}</h3>
        <p>Total Appointments</p>
      </div>

      <div className="stat-card">
        <span className="stat-icon">🔒</span>
        <h3>{bookedSlots}</h3>
        <p>Booked Slots</p>
      </div>

      <div className="stat-card">
        <span className="stat-icon">⚡</span>
        <h3>{availableSlots}</h3>
        <p>Available Slots</p>
      </div>
    </div>
  );
}

export default DashboardStats;
