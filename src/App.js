import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Analytics from './components/Analytics';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import Page6 from './components/Page6';
import Page7 from './components/Page7';
import Profile from './components/Profile';
import Page9 from './components/Page9';
import Page10 from './components/Page10';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import GlobalAuthGuard from './components/GlobalAuthGuard';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <GlobalAuthGuard>
                  <Home />
                </GlobalAuthGuard>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="Analytics" element={<Analytics/>} />
              <Route path="page3" element={<Page3 />} />
              <Route path="page4" element={<Page4 />} />
              <Route path="page5" element={<Page5 />} />
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
