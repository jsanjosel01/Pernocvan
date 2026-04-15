import HeroSection from '../components/home/HeroSection';
import Footer from '../components/common/Footer';

const Home = () => {

  return (

    <div className="home-page">
      
      <HeroSection />
      
      <section style={{ padding: '20px' }}>
        <h3>¿Por qué elegirnos?</h3>
        
        <ul style={{ listStyle: 'none', 
        padding: 0,
        display: 'inline-block', 
        textAlign: 'left'       
        }}>
        
        <li><strong>📺Catálogo Actualizado:</strong> Las mejores series de drama, ciencia ficción y comedia.</li>
        <li><strong>🎬Sincronización total:</strong> Accede a tu lista de seguimiento desde cualquier dispositivo.</li>
        <li><strong>🍿Sin interrupciones:</strong> Una experiencia fluida diseñada para seriéfilos.</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default Home;