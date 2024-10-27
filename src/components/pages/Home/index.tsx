import ContainerGrid from "../../ui/ContainerGrid/ContainerGrid";
import Header from "../../ui/Header/Header";
import ListBranches from "./ListBranches/ListBranches";
import ListCompanies from "./ListCompanies/ListCompanies";

function Home() {
  return (
    <>
      <Header title="Administración MadMax" type="primary" />
      {/* Grilla de 3x1 */}
      <ContainerGrid>
        {/* Sección de Empresas */}
        <ListCompanies />
        {/* Sección de Sucursales x Empresa */}
        <ListBranches />
      </ContainerGrid>
    </>
  );
}

export default Home;
