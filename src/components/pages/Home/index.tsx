import ContainerGrid from "../../ui/ContainerGrid/ContainerGrid";
import Header from "../../ui/Header/Header";
import ListBranches from "./ListBranches/ListBranches";
import ListCompanies from "./ListCompanies/ListCompanies";

function Home() {
  return (
    <>
      <Header title="Bendito Rufian" type="primary" />
      <ContainerGrid>
        <ListCompanies />
        <ListBranches />
      </ContainerGrid>
    </>
  );
}

export default Home;
