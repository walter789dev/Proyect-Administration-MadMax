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
import Loader from "../../../ui/Loader/Loader";

interface ModalProps {
  dataToEdit: IEmpresa | null;
  closeModal: (state?: string) => void;
}

const initial: IEmpresa = {
  nombre: "",
  razonSocial: "",
  cuit: "",
  logo: "",
};

// Formulario Empresa para Editar y Añadir
const FormCompany: FC<ModalProps> = ({ dataToEdit, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [fileImage, setFileImage] = useState<FormData>();
  const [dataForm, setDataForm] = useState<IEmpresa>(initial);

  const { put, post } = helpHttp<IEmpresa>();
  const API_URL = "http://190.221.207.224:8090";
  const dispatch = useAppDispatch();

  // Manejo de Valores del Formulario
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataForm((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("uploads", e.target.files[0]);
      setFileImage(formData);
    }
  };
  // Manejo de Conexion a la BBDD PUT + POST
  const handlerSubmit = async () => {
    setLoading(true);
    const voidValues = Object.keys(dataForm).some((item) => item.length === 0);

    if (voidValues || !fileImage) {
      setLoading(false);
      alert("Faltan campos por completar");
      return;
    }

    const resImage = await fetch(`${API_URL}/images/uploads`, {
      method: "POST",
      body: fileImage,
    });
    const newData = await resImage.text();
    let resInfo = { ...dataForm, logo: newData };

    if (dataToEdit) {
      if (resImage) {
        const res = await put(`empresas/${dataForm.id}`, resInfo);
        if (res) {
          dispatch(updateCompany(resInfo));
          closeModal();
        }
      }
    } else {
      const res = await post(`empresas`, resInfo);
      if (res) {
        dispatch(updateCompaniesData(resInfo));
        closeModal();
      }
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
          <input
            id="image"
            type="file"
            onChange={handlerImage}
            accept="image/jpge, image/jpg"
          />
          {/* Cancelar y Enviar/Actualizar Empresa en BBDD */}
          <div className={styles.modalButtons}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <ButtonForm
                  text="Cancelar"
                  type="cancel"
                  event={() => closeModal()}
                />
                <ButtonForm
                  text="Confirmar"
                  type="confirm"
                  event={handlerSubmit}
                />
              </>
            )}
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FormCompany;
