import Branch from "../branch/Branch";
import Button from "../button/Button";
import styles from "./listBranches.module.css";

const ListBranches = () => {
  return (
    <section>
      <header className={styles.branchInfo}>
        <h3>Cantidad de sucursales: </h3>
        <Button text="Sucursal" type="secondary" />
      </header>
      <section className={styles.branchContainer}>
        <Branch />
        <Branch />
      </section>
    </section>
  );
};

export default ListBranches;
