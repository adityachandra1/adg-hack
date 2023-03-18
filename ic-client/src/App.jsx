import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [state, setState] = useState("false");
  return (
    <div className="App">
      {/* Center a h1 using tailwind and add color   */}
      <Toaster />
      <Login />
    </div>
  );
}

export default App;
