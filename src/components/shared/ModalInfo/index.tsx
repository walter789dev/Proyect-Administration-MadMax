import styles from "./ModalInfo.module.css";
import ButtonForm from "../ButtonForm";
import Modal from "../Modal";

// Definimos una interfaz base para asegurar que todos los tipos tienen las propiedades comunes
interface BaseInfo {
  [key: string]: any;
}

interface ModalInfoProps<T extends BaseInfo> {
  title: string;
  info: T;
  columns: string[];
  setOpenModal: (state?: string) => void;
}

// Hacemos el componente genérico
const ModalInfo = <T extends BaseInfo>({
  title,
  columns,
  info,
  setOpenModal,
}: ModalInfoProps<T>) => {
  // Modificamos la función validateImage para ser más genérica
  const validateImage = () => {
    if ("imagen" in info) {
      return info.imagen?.url || "";
    }
    if ("imagenes" in info) {
      return info.imagenes?.length ? info.imagenes[0].url : "";
    }
    return "logo" in info ? info.logo || "" : "";
  };

  // Función helper para renderizar el valor según el tipo
  const renderValue = (key: string) => {
    if ("categoria" in info && key === "categoria") {
      return info.categoria.denominacion;
    }
    if ("habilitado" in info && key === "habilitado") {
      return info.habilitado ? "Si" : "No";
    }
    if ("alergenos" in info && key === "alergenos") {
      return info.alergenos.length > 0
        ? info.alergenos.map((element: any) => element.denominacion).join(", ")
        : "No tiene";
    }
    return info[key];
  };

  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2>{title}</h2>
        <div className={styles.modalInfo}>
          <div className={styles.modalImage}>
            <img src={validateImage()} alt="Logo" />
          </div>
          <div className={styles.modal2}>
            {columns.map((key) => (
              <p key={key} className={styles.modalText}>
                <b>{key}:</b> {renderValue(key)}
              </p>
            ))}
          </div>
        </div>
        <ButtonForm
          text="Cerrar"
          type="cancel"
          event={() => setOpenModal("info")}
        />
      </section>
    </Modal>
  );
};

export default ModalInfo;
