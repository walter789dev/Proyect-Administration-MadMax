import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./ModalForm.module.css";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import { helpHttp } from "../../../../helpers/helpHttp";
import { useAppDispatch } from "../../../../hooks/redux";
import {
  updateCompaniesData,
  updateCompany,
} from "../../../../redux/slices/companySlice";

const URL_API = "http://190.221.207.224:8090";

interface ModalProps {
  dataToEdit: IEmpresa | null;
  setDataToEdit: (state: IEmpresa | null) => void;
  setOpenModal: (state: boolean) => void;
}

const initial: IEmpresa = {
  nombre: "",
  razonSocial: "",
  cuit: "",
  logo: "https://cdn2.thecatapi.com/images/e94.jpg",
};

const ModalForm: FC<ModalProps> = ({
  dataToEdit,
  setDataToEdit,
  setOpenModal,
}) => {
  const [dataForm, setDataForm] = useState<IEmpresa>(initial);
  const dispatch = useAppDispatch();

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataForm((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setOpenModal(false);
    setDataToEdit(null);
  };

  const handlerSubmit = () => {
    if (dataToEdit) {
      helpHttp<IEmpresa>()
        .put(`${URL_API}/empresas/${dataForm.id}`, dataForm)
        .then(() => {
          dispatch(updateCompany(dataForm));
          resetForm();
        });
    } else {
      helpHttp<IEmpresa>()
        .post(`${URL_API}/empresas`, dataForm)
        .then(() => {
          dispatch(updateCompaniesData(dataForm));
          resetForm();
        });
    }
  };

  useEffect(() => {
    if (dataToEdit) setDataForm(dataToEdit);
  }, [dataToEdit]);

  return (
    <div className={styles.modal}>
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
            <ButtonForm text="Cancelar" type="cancel" event={resetForm} />
            <ButtonForm text="Confirmar" type="confirm" event={handlerSubmit} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ModalForm;
