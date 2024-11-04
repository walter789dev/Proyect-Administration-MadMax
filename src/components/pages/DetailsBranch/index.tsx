import { useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import ContainerGrid from "../../ui/ContainerGrid/ContainerGrid";
import Header from "../../ui/Header/Header";
import { TableAllergen } from "./TableAllergen/TableAllergen";
import TableProducts from "./TableProducts/TableProducts";
import { Options } from "./Options/Options";
import { useParams } from "react-router-dom";

export const DetailsBranch = () => {
  const [routes, setRoutes] = useState(0);
  const activeBranch = useAppSelector(
    (state) => state.branchReducer.activeBranch
  );
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Header title={activeBranch?.nombre} type="primary" />
      <ContainerGrid>
        <Options routes={routes} setRoutes={setRoutes} />
        {routes == 1 && <TableProducts id={id} />}
        {routes == 2 && <TableAllergen />}
      </ContainerGrid>
    </>
  );
};
