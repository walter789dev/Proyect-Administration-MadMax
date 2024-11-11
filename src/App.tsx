import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { DetailsBranch } from "./pages/DetailsBranch";
import { TableAllergen } from "./components/DetailsBranch/TableAllergen";
import { useAppSelector } from "./hooks/redux";
import TableProducts from "./components/DetailsBranch/TableProducts";
import TableCategories from "./components/DetailsBranch/TableCategories";

function App() {
  const active = useAppSelector((state) => state.branchReducer.activeBranch);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/productos/:id"
        element={<DetailsBranch title={active?.nombre} />}
      >
        <Route index element={<TableProducts id={active?.id} />} />
        <Route
          path="categorias"
          element={<TableCategories id={active?.id} />}
        />
        <Route path="alergenos" element={<TableAllergen />} />
      </Route>
    </Routes>
  );
}

export default App;
