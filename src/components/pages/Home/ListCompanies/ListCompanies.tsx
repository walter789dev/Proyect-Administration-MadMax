import styles from "./listCompanies.module.css";
import Company from "../Company/Company";
import Button from "../../../ui/Button/Button";

const ListCompanies = () => {
  return (
    <nav className={styles.companies} style={{ gridArea: "1 / 1 / 2 / 2" }}>
      <h2 className={styles.companiesTitle}>Todas las Empresas </h2>
      <ul className={styles.companiesUl}>
        <Company />
        <Company />
      </ul>
      <Button text="Empresa" type="primary" />
    </nav>
  );
};

export default ListCompanies;
