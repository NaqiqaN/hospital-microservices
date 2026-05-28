function BillReceipt({ bill, onClose }) {
  if (!bill) {
    return null;
  }

  const totalAmount = Number(bill.hours) * Number(bill.feePerHour);
  const billDate = new Date().toLocaleString();

  return (
    <div className="bill-overlay">
      <div className="bill-modal">
        <div className="bill-topbar">
          <div>
            <p className="bill-label">Patient Discharge Receipt </p>
            <h2>Chiron Hospital</h2>
            <p className="bill-subtitle">Official patient discharge bill </p>
          </div>
        </div>

        <div className="bill-meta-grid">
          <div>
            <span>Bill No. </span>
            <strong>CH- {bill.patientId}-{bill.appointmentNumber}</strong>
          </div>
          <div>
            <span>Bill Date </span>
            <strong>{billDate}</strong>
          </div>
        </div>

        <div className="bill-section-title">Patient Details </div>
        <div className="bill-grid">
          <div><span>Patient ID </span><strong>{bill.patientId}</strong></div>
          <div><span>Patient Name </span><strong>{bill.patientName}</strong></div>
          <div><span>Diagnosis </span><strong>{bill.diagnosis}</strong></div>
          <div><span>Appointment Time </span><strong>{bill.appointmentTime}</strong></div>
        </div>

        <div className="bill-section-title">Doctor & Charges </div>
        <table className="bill-charge-table">
          <thead>
            <tr>
              <th>Doctor </th>
              <th>Specialization </th>
              <th>Hours </th>
              <th>Fee / Hour </th>
              <th>Total </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dr. {bill.doctorName}</td>
              <td>{bill.specialization}</td>
              <td>{bill.hours}</td>
              <td>Rs. {bill.feePerHour}</td>
              <td>Rs. {totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <div className="bill-total-row">
          <span>Grand Total </span>
          <strong>Rs. {totalAmount}</strong>
        </div>

        <div className="bill-footer">
          <p>Thank you for choosing Chiron Hospital. </p>
          <button className="bill-action-btn" onClick={onClose}>Close Receipt</button>
        </div>
      </div>
    </div>
  );
}

export default BillReceipt;
