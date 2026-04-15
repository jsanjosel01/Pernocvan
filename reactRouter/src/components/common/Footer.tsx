import React from 'react';

const Footer = () => {
  
  return (

    <footer style={footerStyles}>
      <p > &copy; 2026 Mi Aplicación React.</p>
      
    </footer>
  );
};

const footerStyles: React.CSSProperties = {
  textAlign: 'center',
  padding: '20px',
  borderTop: '1px solid #ddd',
  marginTop: '40px',
  color: '#666'
};

export default Footer;