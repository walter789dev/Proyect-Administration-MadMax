import { FC, ReactNode } from "react";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import styles from "./Company.module.css";

interface CompanyProp {
  active: boolean;
  company: IEmpresa;
  children: ReactNode;
}

const Company: FC<CompanyProp> = ({ active, company, children }) => {
  return (
    <li className={`${styles.company} ${active && styles.active}`}>
      <div className={styles.companyData}>
        <h3 className={styles.companyTitle}>{company.nombre}</h3>
        <h4 className={styles.companySubTitle}>{company.razonSocial}</h4>
      </div>
      {children}
    </li>
  );
};

export default Company;
