import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import { Products } from "./components/pages/Products";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />

    </Routes>
    </>
  );
}

export default App;
