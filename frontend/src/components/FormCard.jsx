
import '../styles/formCard.css';

const FormCard = ({ title, onSubmit, children, buttonText = "Enviar" }) => {
  return (
    <div className="form-card-container">
      <form className="form-card" onSubmit={onSubmit}>
        {title && <h1>{title}</h1>}
        {children}
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

export default FormCard;
