type TLocation = {
  id: number;
  tipo: TLocationType;
  nome: string;
  tag?: string;
  cnpj: string;
  razaosocial: string;
  datecreate: string;
  datestart: string;
  idclient: number;
  status: string;
  address: Array<TLocationAddress>;
};

type TLocationType = {
  id: number;
  name: string;
};

type TLocationAddress = {
  id: string;
  rua: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
};
