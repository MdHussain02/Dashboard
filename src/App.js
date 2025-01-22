import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import Page6 from './components/Page6';
import Page7 from './components/Page7';
import Profile from './components/Profile';
import Page9 from './components/Page9';
import Page10 from './components/Page10';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/home" element={<Home />}>
            {/* Child routes are now relative */}
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="page2" element={<Page2/>} />
            <Route path="page3" element={<Page3/>} />
            <Route path="page4" element={<Page4/>} />
            <Route path="page5" element={<Page5/>} />
            <Route path="page6" element={<Page6 />} />
            <Route path="page7" element={<Page7 />} />
            <Route path="profile" element={<Profile />} />
            <Route path="page9" element={<Page9 />} />
            <Route path="page10" element={<Page10 />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;