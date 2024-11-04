import { useEffect } from "react";
import Button from "../../../ui/Button/Button";
import Branch from "../Branch/Branch";
import styles from "./listBranches.module.css";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { helpHttp } from "../../../../helpers/helpHttp";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import ModalInfo from "../../../ui/ModalInfo/ModalInfo";
import defaultImage from "../../../../assets/images/goods-truck.svg";
import { setBranchesData } from "../../../../redux/slices/BranchSlice";
import ModalOptions from "../../../ui/ModalOptions/ModalOptions";
import FormBranch from "../FormBranch/FormBranch";
import useModals from "../../../../hooks/useModals";

const ListBranches = () => {
  const {
    modalForm,
    modalInfo,
    dataToEdit,
    info,
    openForm,
    openView,
    resetForm,
  } = useModals<ISucursal>();

  const dispatch = useAppDispatch();
  const branches = useAppSelector((state) => state.branchReducer.branches);
  const activeId = useAppSelector((state) => state.companyReducer.id);

  const getBranches = () => {
    helpHttp<ISucursal>()
      .getAll(`http://190.221.207.224:8090/sucursales/porEmpresa/${activeId}`)
      .then((companiesData) => {
        dispatch(setBranchesData(companiesData));
      });
  };
  // Conexion a la BBDD mediante ID Empresa
  useEffect(() => {
    if (activeId) {
      getBranches();
    }
  }, [activeId]);

  return (
    <>
      {/* Ubico la sección en ContainerGrid mediante gridArea */}
      <section style={{ backgroundColor: "#ecf0f1" }}>
        <header className={styles.branchInfo}>
          <h2>
            Cantidad de sucursales: {branches?.length ? branches.length : "0"}
          </h2>
          {/* Boton para abrir Modal de Sucursal */}
          <Button text="Sucursal" type="secondary" openModal={openForm} />
        </header>
        {/* Sección que contiene Sucursales*/}
        <section className={styles.branchContainer}>
          {branches?.length ? (
            branches.map((branch, id) => (
              <Branch key={id} branch={branch}>
                <ModalOptions item={branch} edit={openForm} view={openView} />
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
      {modalForm && (
        <FormBranch
          idCompany={activeId}
          dataToEdit={dataToEdit}
          closeModal={resetForm}
          getBranches={getBranches}
        />
      )}
      {modalInfo && info && (
        <ModalInfo
          columns={[
            "nombre",
            "empresa",
            "domicilio",
            "esCasaMatriz",
            "horarioApertura",
            "horarioCierre",
          ]}
          info={info}
          setOpenModal={resetForm}
        />
      )}
    </>
  );
};

export default ListBranches;
