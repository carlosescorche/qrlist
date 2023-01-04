import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import List from "./pages/List";
import Signup from "./pages/Signup";
import Subscription from "./pages/Subscription";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/:id" element={<List />} />
        <Route path="/list/:id/signup" element={<Signup />} />
        <Route path="/subscription/:id" element={<Subscription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
