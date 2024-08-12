import React from "react";
import Routings from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      <Routings /> 
    </div>
  );
};

export default App;

