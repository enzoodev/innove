import { BaseRepository } from './shared/BaseRepository';

export type TGetChecklistsParams = {
  idclient: number;
  idlocal: string;
  idexecution: number;
};

type TGetChecklistQuestionsParams = {
  idlocal: string;
  idchecklist: string;
};

type TGetAnswersTypesParams = {
  idclient: number;
};

export type TFinishExecutionParams = {
  idexecution: number;
};

export class ChecklistRepositoryClass extends BaseRepository {
  async getToDoChecklists(params: TGetChecklistsParams) {
    return super.getAll<TChecklist>({
      url: 'checklisttodo',
      params,
    });
  }

  async getDoneChecklists(params: TGetChecklistsParams) {
    return super.getAll<TChecklist>({
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
    return super.getAll<TChecklistQuestion>({
      url: 'checklist',
      params,
    });
  }

  async getAnswersTypes(params: TGetAnswersTypesParams) {
    return super.getAll<TAnswerType>({
      url: 'answerstypes',
      params,
    });
  }

  async finishExecution(params: TFinishExecutionParams) {
    await super.create({
      url: 'endexecution',
      data: params,
    });
  }
}

export const ChecklistRepository = new ChecklistRepositoryClass();
