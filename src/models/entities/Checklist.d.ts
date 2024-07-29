type TChecklistDTO = {
  idchecklist: string;
  name: string;
  dateRegister?: string;
};

type TChecklist = TChecklistDTO & {
  status: 1 | 0;
};
