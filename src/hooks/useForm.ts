import { ChangeEvent, useState } from "react";

function useForm<T>(initial: T) {
   const [dataForm, setDataForm] = useState<T>(initial);

   const handlerChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { target } = e;
      setDataForm((data) => ({
         ...data,
         [target.name]:
            isNaN(Number(target.value)) || Number(target.value) == 0
               ? target.value
               : Number(target.value),
      }));
   };

   return {
      dataForm,
      setDataForm,
      handlerChange
   };
}

export default useForm;