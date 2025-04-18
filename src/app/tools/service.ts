import ApiClient from "@/api/ApiClient";

export default class ToolsService extends ApiClient {
    endpoint: string = 'tools';

    getAll() : Promise<Response> {
        return super.get(this.endpoint);
    }

    get(id: string) : Promise<Response> {
        return super.get(`${this.endpoint}/${id}`);
    }

    post(body: any) : Promise<Response> {
        return super.post(this.endpoint, body);
    }

    postCSV(body: File) : Promise<Response> {
        return super.post(`${this.endpoint}/importCSV`, body);
    }

    put(id: string, body: any) : Promise<Response> {
        return super.put(`${this.endpoint}/${id}`, body);
    }

    delete(id: string) : Promise<Response> {
        return super.delete(`${this.endpoint}/${id}`);
    }
}