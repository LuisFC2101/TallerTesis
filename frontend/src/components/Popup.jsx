import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function Popup({ show, setShow, children }) {
  if (!show) return null;

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={() => setShow(false)}>
          <img src={CloseIcon} alt="cerrar" />
        </button>
        {children}
      </div>
    </div>
  );
}
