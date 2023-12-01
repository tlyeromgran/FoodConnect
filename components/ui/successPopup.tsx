// SuccessPopup.tsx

const SuccessPopup = () => (
  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
    <div style={{ fontSize: '24px', color: 'green', textAlign: 'center' }}>
      <p>✔️</p>
      <p>Restaurant Successfully Submitted</p>
    </div>
  </div>
);

export default SuccessPopup;
