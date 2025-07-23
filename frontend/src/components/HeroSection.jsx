
import { useNavigate } from 'react-router-dom';
import '@styles/hero.css';

const fondoHero = "/LLeuLleu.jpg";


const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${fondoHero})` }}


    >
      <div className="hero-overlay">
        <h1 className="hero-title">Explora el paraíso del Lago Lleu Lleu</h1>
        <p className="hero-subtitle">Descubre alojamientos, artesanía y experiencias únicas</p>
        <button className="hero-button" onClick={() => navigate('/home')}>
          Ver emprendimientos destacados
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
