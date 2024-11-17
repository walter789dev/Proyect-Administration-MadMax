import { useEffect, useState } from "react";
import styles from "./ListBranches.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import useModals from "../../../hooks/useModals";
import { useAppSelector } from "../../../hooks/redux";
import Button from "../../shared/Button";
import Branch from "../Branch";
import ModalOptions from "../../shared/ModalOptions";
import FormBranch from "../FormBranch";
import ViewBranch from "../ViewBranch";
import defaultImage from "../../../assets/images/goods-truck.svg";
import { BranchService } from "../../../services/Home/BranchService";

// -------- Componente para listar las Sucursales ----------
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
  const [branches, setBranches] = useState<ISucursal[]>([]);

  const branchService = new BranchService("sucursales");
  const activeCompany = useAppSelector((state) => state.companyReducer.active);

  useEffect(() => {
    const getBranches = async () => {
      if (activeCompany) {
        const sucursales = await branchService.getAll(
          `porEmpresa/${activeCompany.id}`
        );
        setBranches(sucursales as ISucursal[]);
      }
    };

    getBranches();
  }, [activeCompany]);

  return (
    <>
      <section>
        <header className={styles.branchInfo}>
          <h2>
            Cantidad de sucursales de <span>{activeCompany?.nombre}</span>:{" "}
            {branches?.length ? branches.length : "0"}
          </h2>
          {/* Boton para abrir Modal de Sucursal */}
          <Button
            text="Sucursal"
            type={activeCompany ? "secondary" : "disabled"}
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
          idCompany={activeCompany?.id}
          dataToEdit={dataToEdit}
          closeModal={resetForm}
          setBranches={setBranches}
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
