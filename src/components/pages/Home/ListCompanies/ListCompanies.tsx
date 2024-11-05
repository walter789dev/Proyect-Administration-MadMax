import styles from "./ListCompanies.module.css";
import Company from "../Company/Company";
import Button from "../../../ui/Button/Button";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setCompaniesData } from "../../../../redux/slices/companySlice";
import { helpHttp } from "../../../../helpers/helpHttp";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import ModalInfo from "../../../ui/ModalInfo/ModalInfo";
import ModalOptions from "../../../ui/ModalOptions/ModalOptions";
import FormCompany from "../FormCompany/FormCompany";
import useModals from "../../../../hooks/useModals";

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

  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companyReducer.companies);
  const activeId = useAppSelector((state) => state.companyReducer.id);

  useEffect(() => {
    helpHttp<IEmpresa>()
      .getAll(`empresas`)
      .then((companiesData) => {
        dispatch(setCompaniesData(companiesData));
      });
  }, []);

  return (
    <>
      <nav className={styles.companies}>
        <h2 className={styles.companiesTitle}>Todas las Empresas: </h2>
        <ul className={styles.companiesUl}>
          {companies.length === 0 ? (
            <li>No hay empresas cargadas</li>
          ) : (
            companies.map((company, id) => (
              <Company
                key={id}
                active={activeId === company.id}
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
        <FormCompany dataToEdit={dataToEdit} closeModal={resetForm} />
      )}
      {modalInfo && info && (
        <ModalInfo
          title="Sucursal"
          columns={["nombre", "razonSocial", "cuit"]}
          info={info}
          setOpenModal={resetForm}
        />
      )}
    </>
  );
};

export default ListCompanies;
