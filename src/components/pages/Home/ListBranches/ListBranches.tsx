import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import Branch from "../Branch/Branch";
import styles from "./listBranches.module.css";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { helpHttp } from "../../../../helpers/helpHttp";
import { useAppSelector } from "../../../../hooks/redux";
import ModalOptions from "../ModalOptions/ModalOptions";
import ModalInfo from "../ModalInfo/ModalInfo";
import defaultImage from "../../../../assets/images/goods-truck.svg";

const ListBranches = () => {
  // Estado que maneja las Sucursales
  const [branches, setBranches] = useState<ISucursal[] | void>();
  // Manejo de Modal de Información
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [infoBranch, setInfoBranch] = useState<ISucursal | void>();
  // Campos de UI para mostrar info
  const columns = [
    "nombre",
    "empresa",
    "domicilio",
    "esCasaMatriz",
    "horarioApertura",
    "horarioCierre",
  ];
  // Obtengo ID de Empresa Activa
  const activeCompanyId = useAppSelector(
    (state) => state.companyReducer.activeCompany
  );

  // Manejo de Modal de Informacion Sucursal
  const viewBranch = (element: ISucursal) => {
    setOpenInfoModal(true);
    setInfoBranch(element);
  };
  // Conexion a la BBDD mediante ID Empresa
  useEffect(() => {
    if (activeCompanyId) {
      helpHttp<ISucursal>()
        .getAll(
          `http://190.221.207.224:8090/sucursales/porEmpresa/${activeCompanyId}`
        )
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
          <h2>
            Cantidad de sucursales: {branches?.length ? branches.length : "0"}
          </h2>
          {/* Boton para abrir Modal de Sucursal */}
          <Button text="Sucursal" type="secondary" openModal={() => {}} />
        </header>
        {/* Sección que contiene Sucursales*/}
        <section className={styles.branchContainer}>
          {branches?.length ? (
            branches.map((branch, id) => (
              <Branch key={id} branch={branch}>
                <ModalOptions item={branch} edit={() => {}} view={viewBranch} />
              </Branch>
            ))
          ) : (
            <div className={styles.branchNotResult}>
              <h2>No hay sucursales disponibles</h2>
              <img src={defaultImage} alt="No hay Sucursales" />
            </div>
          )}
        </section>
      </section>
      {openInfoModal && infoBranch && (
        <ModalInfo
          columns={columns}
          info={infoBranch}
          setOpenModal={setOpenInfoModal}
        />
      )}
    </>
  );
};

export default ListBranches;
