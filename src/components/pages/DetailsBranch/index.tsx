import { useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import ContainerGrid from "../../ui/ContainerGrid/ContainerGrid";
import Header from "../../ui/Header/Header";
import { TableAllergen } from "./TableAllergen/TableAllergen";
import TableProducts from "./TableProducts/TableProducts";
import { Options } from "./Options/Options";

export const Products = () => {
  const [routes, setRoutes] = useState(0);
  const activeBranch = useAppSelector(
    (state) => state.branchReducer.activeBranch
  );

  return (
    <>
      <Header title={activeBranch?.nombre} type="primary" />
      <ContainerGrid>
        <Options routes={routes} setRoutes={setRoutes} />
        {routes == 1 && <TableProducts id={activeBranch?.id} />}
        {routes == 2 && <TableAllergen />}
      </ContainerGrid>
    </>
  );
};
