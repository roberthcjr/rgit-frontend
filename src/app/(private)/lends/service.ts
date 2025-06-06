import ApiClient from "@/api/ApiClient";
import { type LendType, type ExtendedLendType } from "./types/lend-type";

export default class LendsService extends ApiClient {
  endpoint: string = "lends";

  async getAll(): Promise<ExtendedLendType[]> {
    const response: Response = await super.get(this.endpoint);
    return response.json();
  }

  async insertLend({ limitDate, tool, user }: LendType): Promise<void | Error> {
    const response: Response = await super.post(
      this.endpoint,
      JSON.stringify({
        limit_date: limitDate,
        tool: {
          id: tool.id,
        },
        user: {
          id: user.id,
        },
      }),
      { "Content-Type": "application/json" },
    );

    if (!response.ok) throw new Error("Houve um erro na inserção");
  }

  async close(id: string): Promise<void | Error> {
    const response: Response = await super.delete(`${this.endpoint}/${id}`);

    if (!response.ok)
      throw new Error("Houve um erro no fechamento do empréstimo");
  }
}
