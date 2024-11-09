import ListBranches from "../../components/Home/ListBranches";
import ListCompanies from "../../components/Home/ListCompanies";
import ContainerGrid from "../../components/shared/ContainerGrid";
import Header from "../../components/shared/Header";

function Home() {
  return (
    <>
      <Header />
      <ContainerGrid>
        <ListCompanies />
        <ListBranches />
      </ContainerGrid>
    </>
  );
}

export default Home;
