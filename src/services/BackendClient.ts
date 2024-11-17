import { AbstractBackendClient } from "./AbstractBackendClient";

export abstract class BackendClient<T> extends AbstractBackendClient<T> {
   constructor(baseUrl: string) {
      super(baseUrl);
   }

   async getAll(url?: string): Promise<T[]> {
      let response;
      if (url) {
         response = await fetch(`${this.baseUrl}/${url}`);
      } else {
         response = await fetch(`${this.baseUrl}`);
      }
      const data = await response.json();
      return data as T[];
   }

   async getById(id: number): Promise<T | null> {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
         return null;
      }
      const data = await response.json();
      return data as T;
   }

   async post(url: string, data: T,): Promise<T> {
      const response = await fetch(`${this.baseUrl}/${url}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });
      const newData = await response.json();
      return newData as T;
   }

   async put(url: string, data: T): Promise<T> {
      const response = await fetch(`${this.baseUrl}/${url}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      });
      const newData = await response.json();
      return newData as T;
   }

   async delete(id: number): Promise<void> {
      const response = await fetch(`${this.baseUrl}/${id}`, {
         method: "DELETE",
      });
      if (!response.ok) {
         throw new Error(`Error al eliminar el elemento con ID ${id}`);
      }
   }
}
