import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import { DetailsBranch } from "./components/pages/DetailsBranch";

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
