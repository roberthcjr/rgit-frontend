export default class ApiClient {
  api: string = process.env.API ?? "http://localhost:8080";
  headers: Headers = new Headers({
    "Access-Control-Allow-Origin": "*",
  });

  get(url: string): Promise<Response> {
    const getRequest = new Request(`${this.api}/${url}`, {
      method: "GET",
      headers: this.headers,
    });
    return fetch(getRequest);
  }

  post(url: string, body: any): Promise<Response> {
    const postRequest = new Request(`${this.api}/${url}`, {
      method: "POST",
      headers: this.headers,
      body,
    });
    return fetch(postRequest);
  }

  put(url: string, body: any): Promise<Response> {
    const putRequest = new Request(`${this.api}/${url}`, {
      method: "PUT",
      headers: this.headers,
      body,
    });
    return fetch(putRequest);
  }

  delete(url: string): Promise<Response> {
    const deleteRequest = new Request(`${this.api}/${url}`, {
      method: "DELETE",
      headers: this.headers,
    });
    return fetch(deleteRequest);
  }
}
