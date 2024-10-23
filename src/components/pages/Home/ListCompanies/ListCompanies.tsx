import styles from "./ListCompanies.module.css";
import Company from "../Company/Company";
import Button from "../../../ui/Button/Button";
import { useEffect, useState } from "react";
import ModalForm from "../ModalForm/ModalForm";
import { CompanyService } from "../../../../services/CompanyService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setCompaniesData } from "../../../../redux/slices/companySlice";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";

const URL_API = "http://190.221.207.224:8090";

const ListCompanies = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataToEdit, setDataToEdit] = useState<IEmpresa | null>(null);

  const companyService = new CompanyService(`${URL_API}/empresas`);
  const companies = useAppSelector((state) => state.companyReducer.companies);
  const dispatch = useAppDispatch();

  const getCompanies = async () => {
    await companyService.getAll().then((companiesData) => {
      dispatch(setCompaniesData(companiesData));
      setLoading(false);
    });
  };

  const editCompany = (data: IEmpresa) => {
    setOpenModal(true);
    setDataToEdit(data);
  };

  useEffect(() => {
    setLoading(true);
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {openModal && (
        <ModalForm
          editCompany={dataToEdit}
          setEditCompany={setDataToEdit}
          closeModal={setOpenModal}
        />
      )}
      <nav className={styles.companies} style={{ gridArea: "1 / 1 / 2 / 2" }}>
        <h2 className={styles.companiesTitle}>Todas las Empresas: </h2>
        <ul className={styles.companiesUl}>
          {loading ? (
            <li>No hay empresas cargadas</li>
          ) : (
            companies.map((item) => (
              <Company key={item.id} company={item} editCompany={editCompany} />
            ))
          )}
        </ul>
        <Button text="Empresa" type="primary" openModal={setOpenModal} />
      </nav>
    </>
  );
};

export default ListCompanies;
