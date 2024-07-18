type TSaveChecklistParams = {
  idchecklist?: string;
  idexecution: string;
  answers: Array<TSaveChecklistAnswer>;
};

type TSaveChecklistAnswer = {
  idquestion: string;
  idanswerstype: string;
  idclassification?: string;
  comments?: string;
};
