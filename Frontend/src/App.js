import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from 'react';
import NotFound from "./components/NotFound";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <div className="App" >
      <NoteState>
        <BrowserRouter basename="iNotebook">
          <Navbar />
          <Alert alert={alert} />
          <div className="container my-5" >
            <Routes>
              <Route exact path="/" element={<Home  showAlert={showAlert}/>} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              <Route element={<NotFound/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
