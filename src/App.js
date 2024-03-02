import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import RegisterForm from "./Components/RegisterForm";
import LoginForm from "./Components/LoginForm";
import LandingPage from "./Components/LandingPage";
import UserProfile from "./Components/UserProfile";
import UserView from "./Components/UserView";
import MainLayout from './Layout/MainLayout';
import { useNavigate } from 'react-router-dom';


function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p><font color="white">There is no page at the requested url</font></p>
    </div>
  );
}

function UnAuthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 60000);

    // Clear the timer on component unmount
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="bg-cyan-600 text-white h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Unauthorized Access</h1>
        <p className="text-lg mb-8">Oops! It seems like you don't have permission to access this page.</p>

        <div className="animate-bounce animate-delay-300">
          <svg className="w-[90px] h-[90px] text-red-500 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <p className="mt-4">Redirecting you back to safety...</p>
      </div>
    </div>
  );
};

function App() {

  return (
    <MainLayout>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/users" element={<UserView />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>

    </MainLayout>
  );
}

export default App;
