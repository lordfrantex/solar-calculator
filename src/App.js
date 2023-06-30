
import Contact from './components/Contact';
import Home from './components/Home';
import Quotation from './components/Quotation';
import Table from './components/Table';
import { Route, Routes } from 'react-router-dom';
import Timeline from './components/Timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import Footer from './components/Footer';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calculator" element={<Table />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quotation" element={<Quotation />} />
      </Routes>
      <Home />
      <Table />
      <Quotation />
      <Contact />
      <Timeline />
      <Footer />
      <div className="whatsapp-chat">
        <div className='container-xxl'>
          <a href='#'>
            <span className='whatsapp'><FontAwesomeIcon icon={faWhatsappSquare} /></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
