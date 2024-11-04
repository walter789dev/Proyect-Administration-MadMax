import styles from "./ListCompanies.module.css";
import Company from "../Company/Company";
import Button from "../../../ui/Button/Button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setCompaniesData } from "../../../../redux/slices/companySlice";
import { helpHttp } from "../../../../helpers/helpHttp";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import ModalInfo from "../../../ui/ModalInfo/ModalInfo";
import ModalFormCompany from "../ModalFormCompany/ModalFormCompany";
import ModalOptions from "../../../ui/ModalOptions/ModalOptions";

const ListCompanies = () => {
  const [openModalInfo, setOpenModalInfo] = useState(false); // Manejo de Ver Empresa
  const [infoCompany, setInfoCompany] = useState<IEmpresa | void>(); // Ver Empresa seleccionada
  // Manejo de Añadir/Editar Empresa
  const [openModalForm, setOpenModalForm] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<IEmpresa | null>(null);

  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companyReducer.companies);
  const activeId = useAppSelector((state) => state.companyReducer.id);
  // Editar Empresda + Abrir Modal
  const editCompany = (data: IEmpresa) => {
    setOpenModalForm(true);
    setDataToEdit(data);
  };
  // Manejo de Modal de Información
  const viewCompany = (company: IEmpresa) => {
    setOpenModalInfo(true);
    setInfoCompany(company);
  };

  useEffect(() => {
    helpHttp<IEmpresa>()
      .getAll(`http://190.221.207.224:8090/empresas`)
      .then((companiesData) => {
        dispatch(setCompaniesData(companiesData));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  edit={editCompany}
                  view={viewCompany}
                />
              </Company>
            ))
          )}
        </ul>
        <Button text="Empresa" type="primary" openModal={setOpenModalForm} />
      </nav>
      {openModalForm && (
        <ModalFormCompany
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          setOpenModal={setOpenModalForm}
        />
      )}
      {openModalInfo && infoCompany && (
        <ModalInfo
          columns={["nombre", "razonSocial", "cuit"]}
          info={infoCompany}
          setOpenModal={setOpenModalInfo}
        />
      )}
    </>
  );
};

export default ListCompanies;
