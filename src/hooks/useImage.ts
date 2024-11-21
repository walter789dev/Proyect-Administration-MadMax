import { ChangeEvent, useState } from "react";

function useImage() {
   // Maneja la vista del componente Loader
   const [loading, setLoading] = useState(false);
   // Verfica si ha recibido una imagen desde input:file
   const [image, setImage] = useState<FormData>();
   const URL = import.meta.env.VITE_URL
   const API_URL = `${URL}/images/uploads`

   // Obtiene la información de la imagen ingresa por input:file
   const handler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
         const formData = new FormData();
         formData.append("uploads", e.target.files[0]);
         setImage(formData);
      }
   };
   // Envia la informacion de la imagen al servidor
   const service = async () => {
      setLoading(true)
      const resImage = await fetch(API_URL, {
         method: "POST",
         body: image,
      });
      const newData = await resImage.text();
      return newData
   }

   return {
      image,
      loading,
      setLoading,
      handler,
      service
   };
}

export default useImage;