import { BaseRepository } from './shared/BaseRepository';

export type TGetChecklistsParams = {
  idclient: number;
  idlocal: string;
  idexecution: string;
};

type TGetChecklistQuestionsParams = {
  idlocal: string;
  idchecklist: string;
};

type TGetAnswersTypesParams = {
  idclient: number;
};

export class ChecklistRepositoryClass extends BaseRepository {
  async getToDoChecklists(params: TGetChecklistsParams) {
    return await super.getAll<TChecklist>({
      url: 'checklisttodo',
      params,
    });
  }

  async getDoneChecklists(params: TGetChecklistsParams) {
    return await super.getAll<TChecklist>({
      url: 'checklistdone',
      params,
    });
  }

  async getAllChecklists(params: TGetChecklistsParams) {
    const [toDoChecklists, doneChecklists] = await Promise.all([
      this.getToDoChecklists(params),
      this.getDoneChecklists(params),
    ]);

    return {
      toDoChecklists,
      doneChecklists,
    };
  }

  async getChecklistQuestions(params: TGetChecklistQuestionsParams) {
    return await super.getAll<TChecklistQuestion>({
      url: 'checklist',
      params,
    });
  }

  async getAnswersTypes(params: TGetAnswersTypesParams) {
    return await super.getAll<TAnswerType>({
      url: 'answerstypes',
      params,
    });
  }
}

export const ChecklistRepository = new ChecklistRepositoryClass();
