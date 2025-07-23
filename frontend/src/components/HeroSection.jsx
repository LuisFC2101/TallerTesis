import '@styles/hero.css';

const fondoHero = "/LLeuLleu.jpg";

const HeroSection = () => {
  

  const scrollToPublicaciones = () => {
    const section = document.getElementById('publicaciones');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${fondoHero})` }}
    >
      <div className="hero-overlay">
        <h1 className="hero-title">Explora el paraíso del Lago Lleu Lleu</h1>
        <p className="hero-subtitle">Descubre alojamientos, artesanía y experiencias únicas</p>
        <button className="hero-button" onClick={scrollToPublicaciones}>
          Ver emprendimientos destacados
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
