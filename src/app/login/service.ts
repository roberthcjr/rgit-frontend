import ApiClient from "@/api/ApiClient";
import { LoginType } from "./model";

// TODO: extends UserService when its created
export default class AuthenticationService extends ApiClient {
  endpoint: string = 'auth';

  async login({username, password}: LoginType) {
    const res = await super.post(`${this.endpoint}/login`, JSON.stringify({username, password}));

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao fazer login");
    }

    return res.json();
  }
}