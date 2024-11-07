import { useEffect } from "react";
import styles from "./styles.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import useModals from "../../../hooks/useModals";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { helpHttp } from "../../../helpers/helpHttp";
import { setBranchesData } from "../../../redux/slices/BranchSlice";
import Button from "../../shared/Button";
import Branch from "../Branch";
import ModalOptions from "../../shared/ModalOptions";
import FormBranch from "../FormBranch";
import ViewBranch from "../ViewBranch";
import defaultImage from "../../../assets/images/image-default.jpg";

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
      <section>
        <header className={styles.branchInfo}>
          <h2>
            Cantidad de sucursales: {branches?.length ? branches.length : "0"}
          </h2>
          {/* Boton para abrir Modal de Sucursal */}
          <Button
            text="Sucursal"
            type={activeId ? "secondary" : "disabled"}
            openModal={openForm}
          />
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
