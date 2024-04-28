import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Singlepage from './pages/Singlepage/Singlepage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Verify from './pages/Verify/Verify';
import Addproduct from './pages/Addproduct/Addproduct';
import Addcategory from './pages/Addcategory/Addcategory';
import Editproduct from './pages/Editproduct/Editproduct';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/singleproduct" element={<Singlepage/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/verify" element={<Verify/>} />
      <Route path="/addproduct" element={<Addproduct/>} />
      <Route path="/addcategory" element={<Addcategory/>} />
      <Route path="/editproduct" element={<Editproduct/>} />
      </Routes>
    </Router>

  );
}

export default App;
