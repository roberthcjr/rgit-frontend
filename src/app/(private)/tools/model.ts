export enum Status {
  AVAILABLE = "Disponível",
  UNAVAILABLE = "Indisponível",
  LENDED = "Emprestada",
}

export type Tool = {
  id: number;
  name: string;
  status: Status;
  brand: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
  insertedAt?: string;
};

export const statusMap: Record<string, Status> = {
  AVAILABLE: Status.AVAILABLE,
  UNAVAILABLE: Status.UNAVAILABLE,
  LENDED: Status.LENDED,
};
