import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { DetailsBranch } from "./pages/DetailsBranch";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:id" element={<DetailsBranch />} />
      </Routes>
    </>
  );
}

export default App;
