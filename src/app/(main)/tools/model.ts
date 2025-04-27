enum Status {
  AVAILABLE = "Disponível",
  UNAVAILABLE = "Indisponível",
  LENDED = "Emprestada",
}

export type Tool = {
  id: string;
  name: string;
  status: Status;
  brand: string;
  category?: string;
  insertedAt?: string;
};

export const statusMap: Record<string, Status> = {
  AVAILABLE: Status.AVAILABLE,
  UNAVAILABLE: Status.UNAVAILABLE,
  LENDED: Status.LENDED,
};