import ApiClient from "@/api/ApiClient";
import { User } from "./model";

export default class UsersService extends ApiClient {
  endpoint: string = "users";

  async getAll(): Promise<User[]> {
    const response: Response = await super.get(this.endpoint);
    return response.json();
  }

  get(id: string): Promise<Response> {
    return super.get(`${this.endpoint}/${id}`);
  }

  post(body: string): Promise<Response> {
    return super.post(this.endpoint, body);
  }

  put(id: string, body: string): Promise<Response> {
    return super.put(`${this.endpoint}/${id}`, body);
  }

  delete(id: string): Promise<Response> {
    return super.delete(`${this.endpoint}/${id}`);
  }
}
