// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connexion from './page/Connexion';
import Inscription from './page/Inscription';
import Home from './page/Home';
import Fichiers from './page/Fichiers';
import Protected from './page/Protected';
import FichiersPartagee from './page/FichiersSend';
import Profil from './page/Profil';
import Notifications from './page/Notifications';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="/inscription" element={<Inscription/>} />
        
        <Route path='/' element={<Protected/>} >
          <Route path="/home" element={<Home/>} />
          <Route path="/list" element={<Fichiers/>} />
          <Route path="/send_list" element={<FichiersPartagee/>} />
          <Route path="/profil" element={<Profil/>} />
          <Route path="/notifications" element={<Notifications/>} />

        </Route>
       
      </Routes>
    </Router>
  );
}

export default App;
