import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import Branch from "../Branch/Branch";
import styles from "./listBranches.module.css";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { helpHttp } from "../../../../helpers/helpHttp";
import { useAppSelector } from "../../../../hooks/redux";
import ModalOptions from "../ModalOptions/ModalOptions";
// import ModalInfo from "../ModalInfo/ModalInfo";

const URL_API = "http://190.221.207.224:8090";

const ListBranches = () => {
  const [branches, setBranches] = useState<ISucursal[] | void>();
  //   const [openInfoModal, setOpenInfoModal] = useState(false);

  const activeCompanyId = useAppSelector(
    (state) => state.companyReducer.activeCompany?.id
  );

  useEffect(() => {
    if (activeCompanyId) {
      helpHttp<ISucursal>()
        .getAll(`${URL_API}/sucursales/porEmpresa/${activeCompanyId}`)
        .then((companiesData) => {
          setBranches(companiesData);
        });
    }
  }, [activeCompanyId]);

  return (
    <>
      {/* Ubico la sección en ContainerGrid mediante gridArea */}
      <section style={{ backgroundColor: "#ecf0f1" }}>
        <header className={styles.branchInfo}>
          <h3>Sucursales: </h3>
          {/* Boton para abrir Modal de Sucursal */}
          <Button text="Sucursal" type="secondary" openModal={() => {}} />
        </header>
        {/* Sección que contiene Sucursales*/}
        <section className={styles.branchContainer}>
          {branches ? (
            branches.map((branch, id) => (
              <Branch key={id} branch={branch}>
                <ModalOptions item={branch} edit={() => {}} view={() => {}} />
              </Branch>
            ))
          ) : (
            <p>No hay Sucursales</p>
          )}
        </section>
      </section>
    </>
  );
};

export default ListBranches;
