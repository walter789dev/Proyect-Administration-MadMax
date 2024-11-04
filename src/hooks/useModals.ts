import { useState } from "react";

function useModals<T>() {
   const [modalForm, setModalForm] = useState(false);
   const [dataToEdit, setDataToEdit] = useState<T | null>(null);

   const [modalInfo, setModalInfo] = useState(false);
   const [info, setInfo] = useState<T | undefined>();

   const openForm = (item?: T) => {
      if (item) setDataToEdit(item);
      setModalForm(true);
   };

   const resetForm = (option?: string) => {
      if (option) {
         setModalInfo(false)
      }
      else {
         setDataToEdit(null);
         setModalForm(false);
      }
   };

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