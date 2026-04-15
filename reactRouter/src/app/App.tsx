
import '../App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from '../components/common/Navbar';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Products from '../pages/Products';
import SignInPage from '../pages/SignInPage';
import Productos from '../pages/Productos';
import RegisterPage from '../pages/RegisterPage';
import Bear from '../pages/Bear';
import Dashboardpage from '../pages/Dashboardpage';


function App() {
  return (
    
    <Router>
    
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/bears" element={<Bear />} />
          <Route path="/dashboardpage" element={<Dashboardpage />} />

        </Routes>
      </div>
    </Router>

  );
}

export default App
