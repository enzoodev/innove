type GetExecuntionsResponse = {
  'em andamento': Array<TExecution> | null;
  finalizado: Array<TExecution> | null;
};

type TExecution = {
  id: number;
  tipo: TExecutionType;
  datestart: string;
  dateend: string;
  detalhes: {
    id: string;
    nome: string;
  };
  idclient: number;
  status: string;
};

type TExecutionType = {
  id: number;
  name: string;
};
