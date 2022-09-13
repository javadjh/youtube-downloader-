import React, { useEffect } from 'react';
import { Routes,Route ,useNavigate} from "react-router-dom";
import LoginPage from './pages/auth/login.page';

import HomePage from './pages/home/HomePage';
function App() {
  const navigation = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigation('/login')
    }
  },[])
  return (
    <>
      <Routes>
        {localStorage.getItem("token") ?(
          <Route path="/" element={<HomePage/>} />
        ):(
          <Route path="/login" element={<LoginPage/>} />
        )}
        
      </Routes>  
    </>
  );
}

export default App;
