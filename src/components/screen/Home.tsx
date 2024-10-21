import ContainerGrid from "../ui/containerGrid/ContainerGrid";
import Header from "../ui/header/Header";
import ListCompanies from "../ui/listCompanies/ListCompanies";
import ListBranches from "../ui/listBranches/ListBranches";

function Home() {
  return (
    <>
      <Header title="Sucursal: Bendito Rufian" color="#160F29" />
      <ContainerGrid>
        <ListCompanies color="#246A73" />
        <ListBranches />
      </ContainerGrid>
    </>
  );
}

export default Home;
