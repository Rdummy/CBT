import { useState } from "react";
import "./assets/styles/App.css";
import "./assets/styles/review-exam-page.css";
import CBTRoute from "./route";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CBTRoute />
    </>
  );
}

export default App;
