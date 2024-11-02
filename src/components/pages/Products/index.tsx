import { useAppSelector } from "../../../hooks/redux";
import ContainerGrid from "../../ui/ContainerGrid/ContainerGrid";
import Header from "../../ui/Header/Header";
import { Options } from "./Options/Options";
import { TableAllergen } from "./TableAllergen/TableAllergen";

export const Products = () => {
  const activeBranch = useAppSelector(
    (state) => state.branchReducer.activeBranch
  );

  return (
    <>
      <Header title={activeBranch?.nombre} type="primary" />
      <ContainerGrid>
        <Options />
        <TableAllergen />
      </ContainerGrid>
    </>
  );
};
