import { useEffect } from "react";
import Button from "../../../ui/Button/Button";
import Branch from "../Branch/Branch";
import styles from "./listBranches.module.css";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { helpHttp } from "../../../../helpers/helpHttp";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import defaultImage from "../../../../assets/images/goods-truck.svg";
import { setBranchesData } from "../../../../redux/slices/BranchSlice";
import ModalOptions from "../../../ui/ModalOptions/ModalOptions";
import FormBranch from "../FormBranch/FormBranch";
import useModals from "../../../../hooks/useModals";
import ViewBranch from "../ViewBranch/ViewBranch";

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
    helpHttp()
      .getAll<ISucursal>(`sucursales/porEmpresa/${activeId}`)
      .then((companiesData) => dispatch(setBranchesData(companiesData)));
  };

  useEffect(() => {
    if (activeId) {
      getBranches();
    }
  }, [activeId]);

  return (
    <>
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
        <ViewBranch
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
