
import './App.css'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Custom Styles and Scripts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';
import Home from './pages/Home';
import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setPromotions } from './app/store';
import { getAllPromotions } from './shared/functions';


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
      //dispatch(setPromotions(getAllPromotions().then((res) => res)));
  });

  return (
    <>

        <Router>
          <Header />
          <div className='container-fluid main--container'>
            <Routes>
              <Route path='' element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </Router>
    </>
  )
}

export default App
