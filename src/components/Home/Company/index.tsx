import { FC, ReactNode } from "react";
import styles from "./Company.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { useAppDispatch } from "../../../hooks/redux";
import { setActiveCompany } from "../../../redux/slices/companySlice";

interface CompanyProp {
  active: boolean;
  company: IEmpresa;
  children: ReactNode;
}

const Company: FC<CompanyProp> = ({ active, company, children }) => {
  const dispatch = useAppDispatch();
  // Actualiza la Empresa que esta en foco para obtener sus sucursales
  const changeCompanyId = () => {
    dispatch(setActiveCompany(company.id));
  };

  return (
    <li
      className={`${styles.company} ${active && styles.active}`}
      onClick={changeCompanyId}
    >
      <div className={styles.companyData}>
        <h3 className={styles.companyTitle}>{company.nombre}</h3>
        <h4 className={styles.companySubTitle}>{company.razonSocial}</h4>
      </div>
      {children}
    </li>
  );
};

export default Company;
