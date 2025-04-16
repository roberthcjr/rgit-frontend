import { Status, Tools } from "../columns";

export const tools: Tools[] = [
    {
      id: "728ed52f",
      name: "Escada",
      status: Status["available"],
      brand: "Lorem",
      insertedAt: new Date().toLocaleDateString("pt-BR"),
    },
    {
      id: "489e1d42",
      name: "Escada",
      status: Status["lended"],
      brand: "Ipsum",
      category: "Jardinagem",
    },
    {
      id: "a17fc3b2",
      name: "Carrinho de Mão",
      status: Status["available"],
      brand: "Dolor",
      insertedAt: new Date().toLocaleDateString("pt-BR"),
    },
    {
      id: "d84e92fa",
      name: "Pá",
      status: Status["lended"],
      brand: "Amet",
      category: "Jardinagem",
    },
    {
      id: "f4c731d9",
      name: "Marreta",
      status: Status["available"],
      brand: "Consectetur",
      insertedAt: new Date().toLocaleDateString("pt-BR"),
    },
    {
      id: "b60da1ae",
      name: "Furadeira",
      status: Status["available"],
      brand: "Elit",
      insertedAt: new Date().toLocaleDateString("pt-BR"),
      category: "Construção",
    },
    {
      id: "c913f7bb",
      name: "Tesoura de Poda",
      status: Status["unavailable"],
      brand: "Sed",
      category: "Jardinagem",
    },{
      id: "e62ba4dc",
      name: "Chave Inglesa",
      status: Status["available"],
      brand: "Magna",
      insertedAt: new Date().toLocaleDateString("pt-BR")
    },
    {
      id: "f93cd712",
      name: "Alicate",
      status: Status["unavailable"],
      brand: "Aliqua",
      category: "Elétrica"
    },
    {
      id: "07bf913a",
      name: "Serra Tico-Tico",
      status: Status["available"],
      brand: "Enim",
      insertedAt: new Date().toLocaleDateString("pt-BR"),
      category: "Madeira"
    },
    {
      id: "4c9a87ef",
      name: "Enxada",
      status: Status["unavailable"],
      brand: "Minim",
      category: "Jardinagem"
    },
    {
      id: "98a7cd34",
      name: "Compressor de Ar",
      status: Status["available"],
      brand: "Veniam",
      insertedAt: new Date().toLocaleDateString("pt-BR"),
      category: "Oficina"
    }
    
  ];
  