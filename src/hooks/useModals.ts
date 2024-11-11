import { useState } from "react";

function useModals<T>() {
   const [modalForm, setModalForm] = useState(false); // Controla el Modal para Crear/Editar T
   const [dataToEdit, setDataToEdit] = useState<T | null>(null); // Contiene el elemento a actualizar
   // Controla el Modal de informacion de T
   const [modalInfo, setModalInfo] = useState(false);
   const [info, setInfo] = useState<T>(); // Contiene la información necesaria para Modal Información
   /* 
      Si recibe un elemento, abre el Modal y envia la información a editar
      Si no, solamente abre el Modal para crear 
   */
   const openForm = (item?: T) => {
      if (item) setDataToEdit(item);
      setModalForm(true);
   };
   // Sirve para resetear la informacion del elemento modificado
   const resetForm = (option?: string) => {
      if (option) {
         setInfo({} as T)
         setModalInfo(false)
      }
      else {
         setDataToEdit(null);
         setModalForm(false);
      }
   };

   // Muestra el Modal de Información
   const openView = (item: T) => {
      setModalInfo(true);
      setInfo(item);
   };

   return {
      modalForm,
      modalInfo,
      dataToEdit,
      info,
      openForm,
      resetForm,
      openView
   }
}

export default useModals;