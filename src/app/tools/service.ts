import ApiClient from "@/api/ApiClient";
import { Tool } from "./model";

export default class ToolsService extends ApiClient {
    endpoint: string = 'tools';

    async getAll() : Promise<Tool[]> {
        const response: Response = await super.get(this.endpoint);
        return response.json();
    }

    get(id: string) : Promise<Response> {
        return super.get(`${this.endpoint}/${id}`);
    }

    post(body: any) : Promise<Response> {
        return super.post(this.endpoint, body);
    }

    postCSV(file: File): Promise<Response> {
        const formData = new FormData();
        formData.append("file", file);
        
        return fetch(`${this.api}/${this.endpoint}/importCSV`, {
          method: "POST",
          body: formData,
        });
      }
      

    put(id: string, body: any) : Promise<Response> {
        return super.put(`${this.endpoint}/${id}`, body);
    }

    delete(id: string) : Promise<Response> {
        return super.delete(`${this.endpoint}/${id}`);
    }
}