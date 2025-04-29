import ApiClient from "@/api/ApiClient";
import { LoginType } from "./model";

// TODO: extends UserService when its created
export default class LoginService extends ApiClient {
  endpoint: string = 'users';

  async login(credentials: FormData) {
    const res = await super.post(this.endpoint, credentials);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao fazer login");
    }

    return res.json();
  }
}