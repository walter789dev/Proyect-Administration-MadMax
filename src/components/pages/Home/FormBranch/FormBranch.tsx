import { ChangeEvent, FC, useEffect, useState } from "react";
import ButtonForm from "../../../ui/ButtonForm/ButtonForm";
import styles from "./FormBranch.module.css";
import { ICreateSucursal } from "../../../../types/dtos/sucursal/ICreateSucursal";
import { helpHttp } from "../../../../helpers/helpHttp";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { IPais } from "../../../../types/IPais";
import { IProvincia } from "../../../../types/IProvincia";
import { ILocalidad } from "../../../../types/ILocalidad";
import Modal from "../../../ui/Modal/Modal";
import useModals from "../../../../hooks/useModals";

interface ModalFormProps {
  idCompany: number | undefined;
  dataToEdit: ISucursal | null;
  closeModal: (state?: string) => void;
  getBranches: () => void;
}

const initial: ICreateSucursal = {
  nombre: "",
  horarioApertura: "00:00",
  horarioCierre: "00:00",
  esCasaMatriz: false,
  latitud: 0,
  longitud: 0,
  logo: "",
  domicilio: {
    calle: "",
    numero: 0,
    cp: 0,
    nroDpto: 0,
    idLocalidad: 0,
    piso: 0,
  },
  idEmpresa: 0,
};

const FormBranch: FC<ModalFormProps> = ({
  idCompany,
  dataToEdit,
  closeModal,
  getBranches,
}) => {
  const [dataForm, setDataForm] = useState<ICreateSucursal>({
    ...initial,
    idEmpresa: idCompany || 0,
  });

  const [paises, setPaises] = useState<IPais[] | void>();
  const [provincias, setProvincias] = useState<IProvincia[] | void>();
   const [localidades, setLocalidades] = useState<ILocalidad[] | void>();
   const [selectLocalidad, setSelectLocalidad] = useState<ILocalidad>();

  const handlerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDataForm((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerChangeDomicilio = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setDataForm((data) => ({
      ...data,
      domicilio: {
        ...data.domicilio,
        [e.target.name]: e.target.value,
      },
    }));
   };
   
   const handlerLocalidad = (
     e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
   ) => {
      if (dataToEdit) {
         const findLocal = localidades?.find(local => local.id === Number(e.target.value))
         setSelectLocalidad(findLocal)
      } else {
         handlerChangeDomicilio(e)
      }
   };

  const manageData = (url: string) => {
    helpHttp<IProvincia | ILocalidad>()
      .getAll(url)
      .then((items) => {
        if ("provincia" in items[0]) setLocalidades(items as ILocalidad[]);
        else setProvincias(items as IProvincia[]);
      });
  };

   const handlerSubmit = () => {
     const {} = useModals()
    if (dataToEdit) {
      
    } else {
      helpHttp<ICreateSucursal>()
        .post(`sucursales/create`, dataForm)
        .then(() => {
          getBranches();
          closeModal();
        });
    }
  };

  useEffect(() => {
    if (dataToEdit)
      setDataForm({
        nombre: dataToEdit.nombre,
        horarioApertura: dataToEdit.horarioApertura,
        horarioCierre: dataToEdit.horarioCierre,
        esCasaMatriz: dataToEdit.esCasaMatriz,
        latitud: dataToEdit.latitud,
        longitud: dataToEdit.longitud,
        domicilio: {
          calle: dataToEdit.domicilio.calle,
          numero: dataToEdit.domicilio.numero,
          cp: dataToEdit.domicilio.cp,
          piso: dataToEdit.domicilio.piso,
          nroDpto: dataToEdit.domicilio.nroDpto,
        },
        idEmpresa: dataToEdit.empresa.id!,
        logo: dataToEdit.logo ?? null,
        eliminado: dataToEdit.eliminado,
        categorias: dataToEdit.categorias,
      });
  }, []);

  useEffect(() => {
    helpHttp<IPais>()
      .getAll(`paises`)
      .then((paises) => {
        setPaises(paises);
      });
  }, []);

  return (
    <Modal>
      <div className={styles.modalContent}>
        <h2>{dataToEdit ? "Editar" : "Añadir"} Sucursal</h2>
        <form className={styles.modalForm}>
          <div className={styles.first}>
            <label>Ingrese nombre: </label>
            <input
              type="text"
              className={styles.formGroup}
              name="nombre"
              required
              placeholder="Ej: Rodolfo"
              value={dataForm.nombre}
              onChange={handlerChange}
            />
            <label>Ingrese latitud: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="latitud"
              placeholder="Ingrese latitud"
              value={dataForm.latitud}
              onChange={handlerChange}
            />
            <label>Ingrese longitud: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="longitud"
              placeholder="Ingrese longitud"
              value={dataForm.longitud}
              onChange={handlerChange}
            />
            <label>Ingrese codigo postal: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="cp"
              required
              placeholder="Ingrese codigo postal"
              value={dataForm.domicilio.cp}
              onChange={handlerChangeDomicilio}
            />
          </div>
          <div className={styles.third}>
            <label>Ingrese calle: </label>
            <input
              type="text"
              className={styles.formGroup}
              name="calle"
              required
              placeholder="Ej: Avenida Ferro"
              value={dataForm.domicilio.calle}
              onChange={handlerChangeDomicilio}
            />
            <label>Ingrese número de calle: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="numero"
              required
              placeholder="Ingrese número de calle"
              value={dataForm.domicilio.numero}
              onChange={handlerChangeDomicilio}
            />
            <label>Ingrese número de departamento: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="nroDpto"
              placeholder="Ingrese N° de departamento"
              value={dataForm.domicilio.nroDpto}
              onChange={handlerChangeDomicilio}
            />
            <label>Ingrese número de piso: </label>
            <input
              type="number"
              className={styles.formGroup}
              name="piso"
              placeholder="Ingrese N° de piso"
              value={dataForm.domicilio.piso}
              onChange={handlerChangeDomicilio}
            />
          </div>
          <div className={styles.second}>
            <div>
              <label>Ingrese horario de apertura: </label>
              <input
                type="time"
                className={styles.formGroup}
                name="horarioApertura"
                required
                value={dataForm.horarioApertura}
                onChange={handlerChange}
              />
            </div>
            <div>
              <label htmlFor="horario-c">Ingrese horario de cierre: </label>
              <input
                type="time"
                className={styles.formGroup}
                name="horarioCierre"
                required
                value={dataForm.horarioCierre}
                onChange={handlerChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Seleccione país: </label>
              <select
                name="country"
                required
                onChange={(e) =>
                  manageData(`provincias/findByPais/${e.target.value}`)
                }
              >
                <option value="">Seleccione...</option>
                {paises?.map((pais, id) => (
                  <option key={id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Seleccione provincia: </label>
              <select
                name="province"
                required
                onChange={(e) =>
                  manageData(`localidades/findByProvincia/${e.target.value}`)
                }
              >
                <option value="">Seleccione...</option>
                {provincias?.map((prov, id) => (
                  <option key={id} value={prov.id}>
                    {prov.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Seleccione localidad: </label>
              <select
                name="idLocalidad"
                onChange={handlerLocalidad}
                required
              >
                <option value="">Seleccione...</option>
                {localidades?.map((local, id) => (
                  <option key={id} value={local.id}>
                    {local.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.fourthy}>
            <div>
              <label htmlFor="image">Elija una imagen: </label>
              <label className={styles.customFileUpload}>
                <input type="file" id="image" name="image" required />
              </label>
            </div>
            <div className={styles.containerButtons}>
              <ButtonForm
                type="cancel"
                text="Cancelar"
                event={() => closeModal()}
              />
              <ButtonForm
                type="confirm"
                text="Confirmar"
                event={handlerSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FormBranch;
