import { RouteLists } from "./routes/RouteLists";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <RouteLists />
      <ToastContainer />
    </div>
  );
}

export default App;
