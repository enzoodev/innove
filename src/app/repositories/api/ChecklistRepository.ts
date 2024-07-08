import { BaseRepository } from './shared/BaseRepository';

export class ChecklistRepositoryClass extends BaseRepository {
  async getToDoChecklists(params: TGetChecklistsParams): Promise<TChecklist[]> {
    const response = await super.getAll<TChecklistDTO>({
      url: 'checklisttodo',
      params,
    });

    return response.map(item => ({
      ...item,
      status: 0,
    }));
  }

  async getDoneChecklists(params: TGetChecklistsParams): Promise<TChecklist[]> {
    const response = await super.getAll<TChecklistDTO>({
      url: 'checklistdone',
      params,
    });

    return response.map(item => ({
      ...item,
      status: 1,
    }));
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

  async saveChecklist(params: TSaveChecklistParams) {
    return super.create({
      url: 'savechecklist',
      data: params,
    });
  }
}

export const ChecklistRepository = new ChecklistRepositoryClass();
