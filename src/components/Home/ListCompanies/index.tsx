import { useEffect, useState } from "react";
import styles from "./ListCompanies.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import useModals from "../../../hooks/useModals";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { setActiveCompany } from "../../../redux/slices/companySlice";
import Company from "../Company";
import ModalOptions from "../../shared/ModalOptions";
import Button from "../../shared/Button";
import FormCompany from "../FormCompany";
import ModalInfo from "../../shared/ModalInfo";
import { CompanyService } from "../../../services/Home/CompanyService";

// --------- Componente para listar Empresas ------------
const ListCompanies = () => {
  const {
    modalForm,
    modalInfo,
    dataToEdit,
    info,
    openForm,
    openView,
    resetForm,
  } = useModals<IEmpresa>();
  const [companies, setCompanies] = useState<IEmpresa[]>([]);

  const dispatch = useAppDispatch();
  const companyService = new CompanyService("empresas");
  const active = useAppSelector((state) => state.companyReducer.active);

  useEffect(() => {
    const getCompanies = async () => {
      const companies = await companyService.getAll();
      if (!active) dispatch(setActiveCompany(companies[0]));
      setCompanies(companies);
    };

    getCompanies();
  }, []);

  return (
    <>
      <nav className={styles.companies}>
        <h2 className={styles.companiesTitle}>Todas las Empresas: </h2>
        <ul className={styles.companiesUl}>
          {companies.length === 0 ? (
            <li className={styles.void}>No hay empresas cargadas</li>
          ) : (
            companies.map((company, id) => (
              <Company
                key={id}
                active={active?.id === company.id}
                company={company}
              >
                <ModalOptions
                  type="secondary"
                  item={company}
                  edit={openForm}
                  view={openView}
                />
              </Company>
            ))
          )}
        </ul>
        <Button text="Empresa" type="primary" openModal={openForm} />
      </nav>
      {modalForm && (
        <FormCompany
          dataToEdit={dataToEdit}
          closeModal={resetForm}
          setCompany={setCompanies}
        />
      )}
      {modalInfo && info && (
        <ModalInfo
          title="Empresa"
          columns={["nombre", "razonSocial", "cuit"]}
          info={info}
          setOpenModal={resetForm}
        />
      )}
    </>
  );
};

export default ListCompanies;
