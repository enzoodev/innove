type TSaveChecklistParams = {
  idexecution: string;
  idchecklist: string;
  answers: Array<TSaveChecklistAnswer>;
};

type TSaveChecklistAnswer = {
  idquestion: string;
  idanswerstype: string;
  idclassification?: string;
  comments?: string;
};
