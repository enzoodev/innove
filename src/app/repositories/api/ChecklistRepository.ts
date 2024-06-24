import { BaseRepository } from './shared/BaseRepository';

type TGetChecklistsParams = {
  idclient: string;
  idlocal: string;
  idexecution: string;
};

type TGetChecklistQuestionsParams = {
  idlocal: string;
  idchecklist: string;
};

type TGetAnswersTypesParams = {
  idclient: string;
};

export class ChecklistRepository extends BaseRepository {
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
