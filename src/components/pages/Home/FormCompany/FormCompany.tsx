import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./FormCompany.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { helpHttp } from "../../../../helpers/helpHttp";
import { useAppDispatch } from "../../../../hooks/redux";
import {
  updateCompaniesData,
  updateCompany,
} from "../../../../redux/slices/companySlice";
import Modal from "../../../ui/Modal/Modal";

interface ModalProps {
  dataToEdit: IEmpresa | null;
  closeModal: (state?: boolean) => void;
}

const initial: IEmpresa = {
  nombre: "",
  razonSocial: "",
  cuit: "",
  logo: "https://cdn2.thecatapi.com/images/e94.jpg",
};

// Formulario Empresa para Editar y Añadir
const FormCompany: FC<ModalProps> = ({ dataToEdit, closeModal }) => {
  const [dataForm, setDataForm] = useState<IEmpresa>(initial);
  const dispatch = useAppDispatch();

  // Manejo de Valores del Formulario
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataForm((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };
  // Manejo de Conexion a la BBDD PUT + POST
  const handlerSubmit = () => {
    if (dataToEdit) {
      helpHttp<IEmpresa>()
        .put(`http://190.221.207.224:8090/empresas/${dataForm.id}`, dataForm)
        .then(() => {
          dispatch(updateCompany(dataForm));
          closeModal();
        });
    } else {
      helpHttp<IEmpresa>()
        .post(`http://190.221.207.224:8090/empresas`, dataForm)
        .then(() => {
          dispatch(updateCompaniesData(dataForm));
          closeModal();
        });
    }
  };

  useEffect(() => {
    if (dataToEdit) setDataForm(dataToEdit);
  }, [dataToEdit]);

  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2>{dataToEdit ? "Editar" : "Añadir"} Empresa</h2>
        <form className={styles.modalForm}>
          <input
            name="nombre"
            type="text"
            required
            placeholder="Ingrese Nombre"
            value={dataForm.nombre}
            onChange={handlerChange}
          />
          <input
            name="razonSocial"
            type="text"
            required
            placeholder="Ingrese Razon Social"
            value={dataForm.razonSocial}
            onChange={handlerChange}
          />
          <input
            name="cuit"
            type="number"
            required
            placeholder="Ingrese Cuit"
            value={dataForm.cuit}
            onChange={handlerChange}
          />
          <label className={styles.modalLabel} htmlFor="image">
            Ingrese Logo:
          </label>
          <input id="image" type="file" accept="image/jpge, image/jpg" />
          {/* Cancelar y Enviar/Actualizar Empresa en BBDD */}
          <div className={styles.modalButtons}>
            <ButtonForm text="Cancelar" type="cancel" event={closeModal} />
            <ButtonForm text="Confirmar" type="confirm" event={handlerSubmit} />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FormCompany;
