type TChecklistDTO = {
  idchecklist: string;
  dateRegister: string;
  name: string;
};

type TChecklist = TChecklistDTO & {
  status: 1 | 0;
};
