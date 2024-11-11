import { FC, ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
}

// --------- Establece el fondo opaco para los modales pertinentes --------
const Modal: FC<ModalProps> = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};

export default Modal;
