import { FC, useEffect } from "react";
import styles from "./FormCategory.module.css";
import { IUpdateCategoria } from "../../../types/dtos/categorias/IUpdateCategoria";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
import ButtonForm from "../../shared/ButtonForm";
import Modal from "../../shared/Modal";
import useForm from "../../../hooks/useForm";
import { useAppSelector } from "../../../hooks/redux";
import { CategoriaService } from "../../../services/DetailsBranch/CategoriaService";

interface Type {
  type: "Padre" | "Hija";
  id: number | null;
}

interface FormProps {
  id: number | undefined;
  dataToEdit: IUpdateCategoria | null;
  type: Type;
  closeModal: () => void;
  setCategorias: (
    updater: (state: ICreateCategoria[]) => ICreateCategoria[]
  ) => void;
  setActive: (state: boolean) => void;
}

// --------- Componente Formulario de Categoria ----------
const FormCategory: FC<FormProps> = ({
  id,
  dataToEdit,
  type,
  closeModal,
  setCategorias,
  setActive,
}) => {
  const idEmpresa = useAppSelector((state) => state.companyReducer.active?.id);
  const { dataForm, handlerChange, setDataForm } = useForm<
    ICreateCategoria | IUpdateCategoria
  >({
    denominacion: "",
    idEmpresa: idEmpresa,
    idCategoriaPadre: type.id,
  });

  const categoriaService = new CategoriaService("categorias");

  const handlerSubmit = async () => {
    if (type.type === "Padre") {
      if (dataToEdit) {
        const editCategory = await categoriaService.put(
          `update/${dataForm.id}`,
          {
            ...dataForm,
            idSucursales: [id],
            idEmpresa,
          } as IUpdateCategoria
        );

        if (editCategory) {
          setCategorias(
            (categorias) =>
              categorias.map((category) =>
                category.id == editCategory.id ? editCategory : category
              ) as ICreateCategoria[]
          );
        }
      } else {
        const newCategory = await categoriaService.post(
          `create`,
          dataForm as ICreateCategoria
        );
        if (newCategory)
          setCategorias(
            (categorias) => [...categorias, newCategory] as ICreateCategoria[]
          );
      }
    } else {
      // Categoria Hija
      if (dataToEdit) {
        const res = await categoriaService.put(
          `update/${dataForm.id}`,
          dataForm as IUpdateCategoria
        );
        if (res) setActive(false);
      } else {
        await categoriaService.post(`create`, dataForm);
      }
    }
    closeModal();
  };

  useEffect(() => {
    if (dataToEdit) {
      setDataForm(dataToEdit);
    }
  }, []);
  return (
    <Modal>
      <section className={styles.modalSection}>
        <h2>
          {dataToEdit ? "Editar" : "Añadir"} Categoria {type.type}
        </h2>
        <form className={styles.modalForm}>
          <input
            name="denominacion"
            type="text"
            required
            placeholder="Ingrese nombre de categoria"
            value={dataForm.denominacion}
            onChange={handlerChange}
          />
          <div className={styles.modalButtons}>
            <ButtonForm
              text="Cancelar"
              type="cancel"
              event={() => closeModal()}
            />
            <ButtonForm text="Confirmar" type="confirm" event={handlerSubmit} />
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default FormCategory;
