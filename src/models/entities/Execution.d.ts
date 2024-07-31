type GetExecuntionsResponse = {
  'em andamento': Array<TExecution> | null;
  finalizado: Array<TExecution> | null;
};

type TExecution = {
  id: number;
  tipo: TExecutionType;
  datestart: string;
  dateend: string;
  idclient: number;
  status: string;
  detalhes: TExecutionDetails;
};

type TExecutionDetails = {
  id: string;
  nome: string;
  cnpj?: string;
  razaosocial?: string;
  datestart?: string;
  address?: Array<TLocationAddress>;
};

type TExecutionType = {
  id: number;
  name: TExecutionName;
};

type TExecutionName = 'Equipamentos' | 'Obra' | 'Setor/Área';
