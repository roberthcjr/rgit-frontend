import ApiClient from "@/api/ApiClient";
import { UserType, type ExtendedUserType } from "./types/user-type";

export default class UsersService extends ApiClient {
  endpoint: string = "users";

  async getAllWithoutLends(): Promise<ExtendedUserType[]> {
    return await this.getAll({ query: "hasLends=false" });
  }

  async getAll(options?: { query: string }): Promise<ExtendedUserType[]> {
    const response: Response = await super.get(
      `${this.endpoint}?${options?.query}`,
    );
    return response.json();
  }

  async insertUser({
    name,
    surname,
    username,
    password,
    job,
    section,
  }: UserType): Promise<void | Error> {
    const response: Response = await super.post(
      this.endpoint,
      JSON.stringify({
        name,
        surname,
        username,
        password,
        job,
        section,
      }),
      { "Content-Type": "application/json" },
    );

    if (!response.ok) throw new Error("Houve um erro na inserção");
  }

  async updateUser({
    id,
    name,
    surname,
    username,
    password,
    job,
    section,
  }: ExtendedUserType): Promise<void> {
    const payload: Record<string, unknown> = {
      name,
      surname,
      username,
      job,
      section,
    };

    if (password) payload.password = password;

    const response = await super.patch(
      `${this.endpoint}/${id}`,
      JSON.stringify(payload),
      { "Content-Type": "application/json" },
    );

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      throw new Error(
        `Houve um erro na inserção: ${response.status} ${errorBody}`,
      );
    }
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
