import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import Header from "../../components/shared/Header";
import ContainerGrid from "../../components/shared/ContainerGrid";
import { Options } from "../../components/DetailsBranch/Options";
import TableCategories from "../../components/DetailsBranch/TableCategories";
import TableProducts from "../../components/DetailsBranch/TableProducts";
import { TableAllergen } from "../../components/DetailsBranch/TableAllergen";

export const DetailsBranch = () => {
  const [routes, setRoutes] = useState(0);
  const activeBranch = useAppSelector(
    (state) => state.branchReducer.activeBranch
  );
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Header title={activeBranch?.nombre} type="sucursal" />
      <ContainerGrid type="secondary">
        <Options routes={routes} setRoutes={setRoutes} />
        {routes == 0 && <TableCategories id={id} />}
        {routes == 1 && <TableProducts id={id} />}
        {routes == 2 && <TableAllergen />}
      </ContainerGrid>
    </>
  );
};
