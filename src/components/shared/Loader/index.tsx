import styles from "./styles.module.css";

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
