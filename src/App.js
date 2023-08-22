import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from './Component/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import store from './store/index.js'
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Auth from "./utils/Auth";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Provider store={store} >
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path=":username" element={<Profile />} />
          </Routes>
        </Provider>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
