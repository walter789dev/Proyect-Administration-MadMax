import styles from "./Loader.module.css";

// ------------ Loader de carga ---------
const Loader = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.circle} />
        <div className={styles.circle} />
        <div className={styles.circle} />
      </div>
    </>
  );
};

export default Loader;
