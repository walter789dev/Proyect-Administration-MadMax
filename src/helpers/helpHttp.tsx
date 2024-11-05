interface IOptionsHTTP {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: {
    [key: string]: string;
  };
  body?: string | null;
}

export function helpHttp<T>() {
  const API_URL = "http://190.221.207.224:8090";
  // Manejo de la conexion a la BBDD - Generico
  function customFetch(url: string, options: IOptionsHTTP, element: T | void) {
    const defaultHeader = {
      "Content-Type": "application/json",
    };

    if (options.method === "POST" || options.method == "PUT") {
      options.headers = options.headers
        ? { ...defaultHeader, ...options.headers }
        : defaultHeader;
    }

    options.body = JSON.stringify(element) || null;
    if (options.body === null) delete options.body;

    return fetch(`${API_URL}/${url}`, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  }

  function getBy(url: string): Promise<T> {
    const options: IOptionsHTTP = {
      method: "GET",
    };
    return customFetch(url, options);
  }

  function getAll(url: string): Promise<T[]> {
    const options: IOptionsHTTP = {
      method: "GET",
    };
    return customFetch(url, options);
  }

  const post = (url: string, element: T): Promise<Response> => {
    const options: IOptionsHTTP = {
      method: "POST",
    };
    return customFetch(url, options, element);
  };

  const put = (url: string, element: T): Promise<Response> => {
    const options: IOptionsHTTP = {
      method: "PUT",
    };
    return customFetch(url, options, element);
  };

  const del = (url: string) => {
    const options: IOptionsHTTP = {
      method: "DELETE",
    };
    return customFetch(url, options);
  };

  return {
    getBy,
    getAll,
    post,
    put,
    del,
  };
}
