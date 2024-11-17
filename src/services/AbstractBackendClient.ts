export abstract class AbstractBackendClient<T> {
   protected baseUrl: string;

   constructor(baseUrl: string) {
      this.baseUrl = "http://190.221.207.224:8090/" + baseUrl;
   }

   abstract getAll(): Promise<T[]>;
   abstract getById(id: number): Promise<T | null>;
   abstract post(url: string, data: T): Promise<T>;
   abstract put(url: string, data: T): Promise<T>;
   abstract delete(id: number): Promise<void>;
}