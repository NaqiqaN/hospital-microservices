function SlotTable({ appointments, doctors }) {
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM",
    "09:00 PM"
  ];

  function isDoctorBooked(doctorId, time) {
    return appointments.some((appointment) =>
      appointment.doctor.id === doctorId &&
      appointment.appointmentTime === time
    );
  }

  return (
    <div className="slot-section">
      <h2>Doctor Slot Availability</h2>

      <table className="slot-table">
        <thead>
          <tr>
            <th>Time</th>
            {doctors.map((doctor) => (
              <th key={doctor.id}>
                {doctor.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td>{time}</td>

              {doctors.map((doctor) => {
                const booked = isDoctorBooked(doctor.id, time);

                return (
                  <td
                    key={doctor.id}
                    className={booked ? "booked-slot" : "free-slot"}
                  >
                    {booked ? "Booked" : "Free"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SlotTable;