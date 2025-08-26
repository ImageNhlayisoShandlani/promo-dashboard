
import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Custom Styles and Scripts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';
import Home from './pages/Home';
import PromotionTypePage from './pages/PromotionTypePgae';
import Subscriptions from './pages/Subscriptions';


function App() {

  return (
    <>

        <Router>
          <Header />
          <div className='container-fluid'>
            <Routes>
              <Route path='' element={<Home />} />
              <Route path='/promotion/:type' element={<PromotionTypePage />} />
              <Route path='/subscriptions' element={<Subscriptions />} />
            </Routes>
          </div>
          <Footer />
        </Router>
    </>
  )
}

export default App
