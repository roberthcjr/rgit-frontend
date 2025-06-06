import ApiClient from "@/api/ApiClient";
import { Tool } from "./model";
import type { EditToolType, InsertToolType } from "./types/insert-tool.type";

export default class ToolsService extends ApiClient {
  endpoint: string = "tools";

  async getAllAvailable(): Promise<Tool[]> {
    return await this.getAll({ query: "status=AVAILABLE" });
  }

  async getAll(options?: { query: string }): Promise<Tool[]> {
    const response: Response = await super.get(
      `${this.endpoint}?${options?.query}`,
    );
    return response.json();
  }

  async insertTool({
    name,
    brand,
    category,
  }: InsertToolType): Promise<void | Error> {
    const response: Response = await super.post(
      this.endpoint,
      JSON.stringify({
        name,
        brand,
        category,
      }),
      { "Content-Type": "application/json" },
    );

    if (!response.ok) throw new Error("Houve um erro na inserção");
  }

  async updateTool({ id, name, status }: EditToolType): Promise<void | Error> {
    const response: Response = await super.patch(
      `${this.endpoint}/${id}`,
      JSON.stringify({
        name,
        status,
      }),
      { "Content-Type": "application/json" },
    );

    if (!response.ok) throw new Error("Houve um erro na atualização");
  }

  get(id: string): Promise<Response> {
    return super.get(`${this.endpoint}/${id}`);
  }

  post(body: string): Promise<Response> {
    return super.post(this.endpoint, body);
  }

  async postCSV(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await super.post(`${this.endpoint}/importCSV`, formData);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao importar CSV");
    }

    return res.json();
  }

  put(id: string, body: string): Promise<Response> {
    return super.put(`${this.endpoint}/${id}`, body);
  }

  delete(id: number): Promise<Response> {
    return super.delete(`${this.endpoint}/${id}`);
  }
}
