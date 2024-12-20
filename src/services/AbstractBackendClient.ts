export abstract class AbstractBackendClient<T> {
  protected baseUrl: string;
  protected viteUrl: string = import.meta.env.VITE_URL;

  constructor(baseUrl: string) {
    this.baseUrl = this.viteUrl + "/" + baseUrl;
  }

  abstract getAll(): Promise<T[]>;
  abstract getById(id: number): Promise<T | null>;
  abstract post(url: string, data: T): Promise<T>;
  abstract put(url: string, data: T): Promise<T>;
  abstract delete(id: number): Promise<void>;
}
