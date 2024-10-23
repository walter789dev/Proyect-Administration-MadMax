import { FC } from "react";
import styles from "./inputForm.module.css";

interface InputProps {
  type: string;
  text: string;
}

const InputForm: FC<InputProps> = ({ type, text }) => {
  return (
    <div className={styles.inputGroup}>
      <input required type={type} name="text" className={styles.input} />
      <label className={styles.userLabel}>{text}</label>
    </div>
  );
};

export default InputForm;
