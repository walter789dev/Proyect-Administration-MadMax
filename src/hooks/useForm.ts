import { ChangeEvent, useState } from "react";

function useForm<T>(initial: T) {
   const [dataForm, setDataForm] = useState<T>(initial);

   const handlerChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { target } = e;
      setDataForm(() => ({
         ...dataForm,
         [target.name]:
            isNaN(Number(target.value)) || Number(target.value) == 0
               ? target.value
               : Number(target.value),
      }));
   };

   const handlerCheck = (e: ChangeEvent<HTMLInputElement>) => {
      setDataForm({
         ...dataForm,
         [e.target.name]: e.target.checked
      })
   }

   return {
      dataForm,
      setDataForm,
      handlerChange,
      handlerCheck
   };
}

export default useForm;