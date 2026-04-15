import { Link } from 'react-router-dom';
import Aurora from '../animations/Aurora';


const HeroSection = () => {
  return (
    <>
    <section style={heroStyles}>
      <h1>Tus Series favoritas en un solo lugar</h1>
      <p>"Organiza tu lista y no te pierdas ni un solo episodio de tus series favoritas."</p>
      
      
      <Link to="/products">
        <button style={buttonStyle}>Explorar Cátalogo</button>
      </Link>
    </section>
    
    <Aurora
  colorStops={["#f06000","#B19EEF","#000000"]}
  blend={0.5}
  amplitude={1.0}
  speed={1}
/>
    </>
  );
};

const heroStyles: React.CSSProperties = {
  padding: '60px 20px',
  textAlign: 'center',
  backgroundColor: '#f0f2f5',
  borderRadius: '8px',
  margin: '20px 0'
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#5472f7',
  color: 'white',
  border: 'none',
  borderRadius: '10px'
};

export default HeroSection;