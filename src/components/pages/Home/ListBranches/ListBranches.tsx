import Button from "../../../ui/Button/Button";
import Branch from "../Branch/Branch";
import styles from "./listBranches.module.css";

const ListBranches = () => {
  return (
    <>
      <section
        style={{ gridArea: "1 / 2 / 2 / 4", backgroundColor: "#ecf0f1" }}
      >
        <header className={styles.branchInfo}>
          <h3>Cantidad de sucursales: </h3>
          <Button text="Sucursal" type="secondary" openModal={() => {}} />
        </header>
        <section className={styles.branchContainer}>
          <Branch />
          <Branch />
        </section>
      </section>
    </>
  );
};

export default ListBranches;
