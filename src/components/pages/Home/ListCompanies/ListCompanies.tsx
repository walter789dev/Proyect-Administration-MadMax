import styles from "./ListCompanies.module.css";
import Company from "../Company/Company";
import Button from "../../../ui/Button/Button";
import { useEffect, useState } from "react";
import ModalForm from "../ModalForm/ModalForm";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setCompaniesData } from "../../../../redux/slices/companySlice";
import { helpHttp } from "../../../../helpers/helpHttp";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import ModalInfo from "../ModalInfo/ModalInfo";
import ModalOptions from "../ModalOptions/ModalOptions";

const ListCompanies = () => {
  const [openModalInfo, setOpenModalInfo] = useState(false); // Manejo de Ver Empresa
  const [infoCompany, setInfoCompany] = useState<IEmpresa | void>(); // Ver Empresa seleccionada
  const [openModalForm, setOpenModalForm] = useState(false); // Manejo de Añadir/Editar Empresa
  const [dataToEdit, setDataToEdit] = useState<IEmpresa | null>(null);
  // Manejo de Redux y Conexion Tipada para Empresa
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companyReducer.companies);
  const activeCompany = useAppSelector(
    (state) => state.companyReducer.activeCompany
  );
  // Campos UI a mostrar
  const columns = ["nombre", "razonSocial", "cuit"];
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
                active={activeCompany === company.id}
                company={company}
              >
                <ModalOptions
                  size="lg"
                  item={company}
                  edit={editCompany}
                  view={viewCompany}
                />
              </Company>
            ))
          )}
        </ul>
        {/* Boton Añadir Empresa*/}
        <Button text="Empresa" type="primary" openModal={setOpenModalForm} />
      </nav>
      {openModalForm && (
        <ModalForm
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          setOpenModal={setOpenModalForm}
        />
      )}
      {openModalInfo && infoCompany && (
        <ModalInfo
          columns={columns}
          info={infoCompany}
          setOpenModal={setOpenModalInfo}
        />
      )}
    </>
  );
};

export default ListCompanies;
