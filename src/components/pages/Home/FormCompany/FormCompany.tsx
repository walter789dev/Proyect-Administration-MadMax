import { FC, useEffect } from "react";
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
import useImage from "../../../../hooks/useImage";
import useForm from "../../../../hooks/useForm";

interface ModalProps {
  dataToEdit: IEmpresa | null;
  closeModal: (state?: string) => void;
}

const FormCompany: FC<ModalProps> = ({ dataToEdit, closeModal }) => {
  const { dataForm, setDataForm, handlerChange } = useForm<IEmpresa>({
    nombre: "",
    razonSocial: "",
    cuit: "",
    logo: "",
  });

  const dispatch = useAppDispatch();
  const { put, post } = helpHttp();
  const { image, loading, handler, service, setLoading } = useImage();

  const handlerSubmit = async () => {
    const voidValues = Object.keys(dataForm).some((item) => item.length === 0);

    if (voidValues || !image) {
      alert("Faltan campos por completar");
      setLoading(false);
      return;
    }

    const newImage = await service();
    let resInfo = { ...dataForm, logo: newImage };

    if (dataToEdit) {
      const res = await put<IEmpresa>(`empresas/${dataForm.id}`, resInfo);
      if (res) dispatch(updateCompany(resInfo));
    } else {
      const res = await post<IEmpresa>(`empresas`, resInfo);
      if (res) dispatch(updateCompaniesData(resInfo));
    }
    closeModal();
  };

  useEffect(() => {
    if (dataToEdit) setDataForm(dataToEdit);
  }, []);

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
            onChange={handler}
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
