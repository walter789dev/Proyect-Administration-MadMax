import { FC } from "react";
import styles from "./listCompanies.module.css";
import Company from "../company/Company";
import PrimaryButton from "../primaryButton/PrimaryButton";

interface CompaniesProps {
  color: string;
}

const ListCompanies: FC<CompaniesProps> = ({ color }) => {
  return (
    <nav className={styles.companies} style={{ backgroundColor: color }}>
      <h2 className={styles.companiesTitle}>Todas las Empresas </h2>
      <ul className={styles.companiesUl}>
        <Company />
        <Company />
        <Company />
      </ul>
      <PrimaryButton text="Empresa" type="primary" />
    </nav>
  );
};

export default ListCompanies;
