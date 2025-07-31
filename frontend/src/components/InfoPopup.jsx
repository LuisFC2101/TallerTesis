import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

const InfoPopup = ({ show, setShow, title, children }) => {
  if (!show) return null;

  return (
    <div className="bg">
  <div className="popup info-popup">
    <button className="close" onClick={() => setShow(false)}>
      <img src={CloseIcon} alt="Cerrar" />
    </button>
    <h3>{title}</h3>
    <div className="info-content">
      {children}
    </div>
  </div>
</div>

  );
};

export default InfoPopup;
