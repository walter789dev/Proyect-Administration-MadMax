import styles from "./ListCompanies.module.css";
import Company from "../Company/Company";
import Button from "../../../ui/Button/Button";
import { useEffect, useState } from "react";
import ModalForm from "../ModalForm/ModalForm";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setCompaniesData } from "../../../../redux/slices/companySlice";

import { helpHttp } from "../../../../helpers/helpHttp";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";

const URL_API = "http://190.221.207.224:8090";

const ListCompanies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<IEmpresa | null>(null);
  // Manejo de Redux y Conexion Tipada para Empresa
  const companies = useAppSelector((state) => state.companyReducer.companies);
  const dispatch = useAppDispatch();

  // Conexion a la BBDD - GET ALL Empresa
  const getCompanies = () => {
    helpHttp<IEmpresa>()
      .getAll(`${URL_API}/empresas`)
      .then((companiesData) => {
        dispatch(setCompaniesData(companiesData));
      });
  };

  const editCompany = (data: IEmpresa) => {
    setOpenModal(true);
    setDataToEdit(data);
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav className={styles.companies} style={{ gridArea: "1 / 1 / 2 / 2" }}>
        <h2 className={styles.companiesTitle}>Todas las Empresas: </h2>
        <ul className={styles.companiesUl}>
          {companies.length === 0 ? (
            <li>No hay empresas cargadas</li>
          ) : (
            companies.map((company, id) => (
              <Company key={id} company={company} editCompany={editCompany} />
            ))
          )}
        </ul>
        {/* Boton Añadir Empresa*/}
        <Button text="Empresa" type="primary" openModal={setOpenModal} />
      </nav>
      {openModal && (
        <ModalForm
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          setOpenModal={setOpenModal}
          getCompanies={getCompanies}
        />
      )}
    </>
  );
};

export default ListCompanies;
