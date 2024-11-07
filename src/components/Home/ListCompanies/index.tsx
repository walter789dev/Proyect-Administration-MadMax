import { useEffect } from "react";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import useModals from "../../../hooks/useModals";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { helpHttp } from "../../../helpers/helpHttp";
import { setCompaniesData } from "../../../redux/slices/companySlice";
import Company from "../Company";
import ModalOptions from "../../shared/ModalOptions";
import Button from "../../shared/Button";
import FormCompany from "../FormCompany";
import ModalInfo from "../../shared/ModalInfo";

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
    helpHttp()
      .getAll<IEmpresa>(`empresas`)
      .then((companiesData) => dispatch(setCompaniesData(companiesData)))
      .catch(() =>
        console.log("Conexion: Ha ocurrido un error al obtener Empresas")
      );
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
