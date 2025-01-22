import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ViewPaste from "./components/ViewPaste";
import Paste from "./components/Paste";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar is placed here so it renders on all pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pastes" element={<Paste />} />
        <Route path="/pastes/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
