import ButtonForm from "../buttonForm/ButtonForm";
import styles from "./modalEmpresa.module.css";
import closeImage from "../../../assets/svg/close.svg";
import InputForm from "../inputForm/InputForm";

const ModalEmpresa = () => {
  const inputKeys = [
    ["Nombre", "text"],
    ["Razon social", "text"],
    ["Ciut", "number"],
  ];

  return (
    <div className={styles.modal}>
      <form className={styles.modalForm}>
        <h2>Añadir/Crear Empresa</h2>
        {inputKeys.map((item, i) => (
          <InputForm key={i} type={item[1]} text={item[0]} />
        ))}
        <div>
          <label className={styles.modalLabel} htmlFor="image">
            Ingrese Logo:
          </label>
          <input id="image" type="file" accept="image/jpge, image/jpg" />
        </div>
        <div className={styles.modalButtons}>
          <ButtonForm type="cancel" />
          <ButtonForm type="confirm" />
        </div>
        <img
          className={styles.modalClose}
          src={closeImage}
          alt="Cerrar Modal"
        />
      </form>
    </div>
  );
};

export default ModalEmpresa;
