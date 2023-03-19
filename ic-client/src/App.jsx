import { useState } from "react";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [state, setState] = useState("false");
  return (
    <div className="App">
      {/* Center a h1 using tailwind and add color   */}
      <Login />
    </div>
  );
}

export default App;
